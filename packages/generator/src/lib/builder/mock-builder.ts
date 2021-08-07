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
    this.isPlain = false;
    this.mutations = {};
    this.ignoreKeys = [];

    return mock;
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
