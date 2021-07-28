import { ClassLiteral, Class } from '@mockinbird/types';
import { Always, GeneratedMock, IgnoreKeys, KeyOf, OverrideKeys, ToBe } from './types';
import { MockProducer } from './mock-producer';
import { MockGenerator } from '../generator/mock-generator';

export interface MockBuilder<TClass = any> {
  always: Always<TClass>;
  setLocale(locale: string): this;
  plain(): this;
  mutateOnce(key: keyof TClass, value: TClass[keyof TClass]): this;
  ignoreOnce(...keys: IgnoreKeys<TClass>): this;
  many(count: number): TClass[];
  one(): TClass;
}

export class MockBuilder<TClass = any> extends MockProducer<TClass> {
  private isPlain = false;

  private oneTimeOverrides: OverrideKeys<TClass> = {};
  private oneTimeIgnoreKeys: IgnoreKeys<TClass> = [];

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
    this.oneTimeOverrides = {};
    this.oneTimeIgnoreKeys = [];

    return newMock;
  }

  public mutate: Always<TClass> = {
    setValues: (overrides: OverrideKeys<TClass>): void => {
      super.permanentOverrides(overrides);
    },
    ignore: (...keys: IgnoreKeys<TClass>): this => {
      super.permanentIgnoreKeys(...keys);
      return this;
    },
    setValueOf: (key: keyof TClass): ToBe => {
      return {
        toBe: (value: any): void => {
          this.oneTimeOverrides[key] = value;
        },
      };
    },
  };

  public plain(): this {
    this.isPlain = true;
    return this;
  }

  public mockOnce(key: KeyOf<TClass>, value: TClass[KeyOf<TClass>]): this {
    this.oneTimeOverrides[key] = value;
    return this;
  }

  public ignoreOnce(...keys: IgnoreKeys<TClass>): this {
    this.oneTimeIgnoreKeys.push(...keys);
    return this;
  }

  many(count: number): TClass[] | ClassLiteral<TClass>[] {
    const instances = super.createMany(count, {
      overrides: this.oneTimeOverrides,
      ignore: this.oneTimeIgnoreKeys,
    });

    return this.process(instances);
  }

  one(): TClass | ClassLiteral<TClass> {
    const instance: TClass = super.createOne({
      overrides: this.oneTimeOverrides,
      ignore: this.oneTimeIgnoreKeys,
    });

    return this.process(instance);
  }
}
