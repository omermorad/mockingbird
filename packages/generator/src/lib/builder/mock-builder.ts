import { ClassLiteral, Class } from '@mockinbird/types';
import { GeneratedMock, IgnoreKeys, OverrideKeys } from './types';
import { MockProducer } from './mock-producer';
import { MockGenerator } from '../generator/mock-generator';

export interface MockBuilder<TClass = any> {
  setLocale(locale: string): this;
  plain(): this;
  mutate(overrides: OverrideKeys<TClass>): Omit<MockBuilder<TClass>, 'mutate'>;
  ignore(...keys: IgnoreKeys<TClass>): this;
  one(): TClass;
  many(count: number): TClass[];
}

export class MockBuilder<TClass = any> extends MockProducer<TClass> {
  private isPlain = false;

  private mutations: OverrideKeys<TClass> = {};
  private ignoreKeys: IgnoreKeys<TClass> = [];

  public constructor(targetClass: Class<TClass>, mockGenerator: MockGenerator) {
    super(targetClass, mockGenerator);
  }

  private process(mock: TClass[]): TClass[] | ClassLiteral<TClass>[];
  private process(mock: TClass): TClass | ClassLiteral<TClass>;

  private process(mock: TClass[] | TClass): GeneratedMock<TClass> {
    let newMock = mock;

    if (this.isPlain) {
      if ((mock as TClass[]).length > 1) {
        newMock = (mock as TClass[]).map((mock) => Object.assign({}, mock));
      } else {
        newMock = Object.assign({}, mock);
      }
    }

    this.isPlain = false;
    this.mutations = {};
    this.ignoreKeys = [];

    return newMock;
  }

  public plain(): this {
    this.isPlain = true;
    return this;
  }

  public mutate(overrides: OverrideKeys<TClass>): Omit<MockBuilder<TClass>, 'mutate'> {
    this.mutations = overrides;
    return this;
  }

  public ignore(...keys: IgnoreKeys<TClass>): this {
    this.ignoreKeys = keys;
    return this;
  }

  public one(): TClass | ClassLiteral<TClass> {
    const {} = this;

    const instance: TClass = super.createOne({ mutations: this.mutations, ignore: this.ignoreKeys });
    return this.process(instance);
  }

  public many(count: number): TClass[] | ClassLiteral<TClass>[] {
    const instances = super.createMany(count, { mutations: this.mutations, ignore: this.ignoreKeys });
    return this.process(instances);
  }
}
