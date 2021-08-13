import { ClassLiteral, Class } from '@mockinbird/types';
import { GeneratedMock, IgnoreKeys, Mutations } from './types';
import { MockProducer } from './mock-producer';
import { MockGenerator } from '../generator/mock-generator';

export interface MockBuilder<TClass = any> {
  /**
   * Sets the faker locale inside the MockBuilder, thus, all the mocks that
   * will be generated from the builder will be affected from this setting
   * and will get applied by it
   *
   * @example
   * MockFactory(Bird).setLocale('es').one()
   *
   * @param locale {string}
   * @returns {this} the actual same builder
   */
  setLocale(locale: string): this;

  /**
   * Convert the result into plain object. If the result will be array
   * (using .many()), then all of items in the array will be converted
   * into plain objects
   *
   * @example
   * MockFactory(Bird).plain().one()
   *
   * @returns {this} the same builder
   */
  plain(): this;

  /**
   * Mutates the generated mock(s).
   * .mutate() method enables to set another value for a specific property
   *
   * @example
   * MockFactory(Bird).mutate({ name: 'some-permanent-name' }).one()
   *
   * @param mutations {Mutations<TClass>}
   */
  mutate(mutations: Mutations<TClass>): Omit<MockBuilder<TClass>, 'mutate'>;

  /**
   * Ignore/Omit some properties when from the generated mock(s).
   * Using this method will simply omit the given keys
   *
   * @example
   * MockFactory(Bird).ignore('name').one()
   *
   * @param keys
   * @returns {MockBuilder}
   */
  ignore(...keys: IgnoreKeys<TClass>): this;

  /**
   * Creates exactly one mock from the target class
   *
   * @returns {TClass | Object}
   */
  one(): TClass;

  /**
   * Creates many mocks from the target class.
   *
   * @param count {number} How many mocks to create
   */
  many(count: number): TClass[];
}

export class MockBuilder<TClass = any> extends MockProducer<TClass> {
  private isPlain = false;

  private mutations: Mutations<TClass> = {};
  private ignoreKeys: IgnoreKeys<TClass> = [];

  public constructor(targetClass: Class<TClass>, mockGenerator: MockGenerator) {
    super(targetClass, mockGenerator);
  }

  private process(mock: TClass[]): TClass[] | ClassLiteral<TClass>[];
  private process(mock: TClass): TClass | ClassLiteral<TClass>;

  private process(mock: TClass[] | TClass): GeneratedMock<TClass> {
    this.isPlain = false;
    this.mutations = {};
    this.ignoreKeys = [];

    return mock;
  }

  public plain(): this {
    this.isPlain = true;
    return this;
  }

  public mutate(mutations: Mutations<TClass>): Omit<MockBuilder<TClass>, 'mutate'> {
    this.mutations = mutations;
    return this;
  }

  public ignore(...keys: IgnoreKeys<TClass>): this {
    this.ignoreKeys = keys;
    return this;
  }

  public one(): TClass | ClassLiteral<TClass> {
    const { mutations, ignoreKeys, isPlain } = this;

    const instance: TClass = super.createOne({ mutations, ignore: ignoreKeys, plain: isPlain });
    return this.process(instance);
  }

  public many(count: number): TClass[] | ClassLiteral<TClass>[] {
    const { mutations, ignoreKeys, isPlain } = this;

    const instances = super.createMany(count, { mutations, ignore: ignoreKeys, plain: isPlain });
    return this.process(instances);
  }
}
