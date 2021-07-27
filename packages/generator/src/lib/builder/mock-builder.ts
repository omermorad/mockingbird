import { ClassLiteral, Class } from '@mockinbird/types';
import { Always, IgnoreKeys, KeyOf, OverrideKeys, ToBe } from './types';
import { MockProducer } from './mock-producer';
import { MockGenerator } from '../generator/mock-generator';

export interface MockBuilder<TClass = any> {
  always: Always<TClass>;
  setLocale(locale: string): this;
  plain(): this;
  mockOnce(key: keyof TClass, value: TClass[keyof TClass]): this;
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

  private process(mock: TClass[] | TClass): TClass | ClassLiteral<TClass> | TClass[] | ClassLiteral<TClass>[] {
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

  public always: Always<TClass> = {
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

/**
 * given a MockBuilder
 *    when I want a mock which is a plain object
 *      and I create a single mock using the 'one' method
 *        then return single plain object and not an instance of the target class
 *
 *        and when I create another mock from the same builder reference
 *          then do return an instance of the class and not a plain object
 *
 *      and I create a few mocks using the 'many' method
 *        then return an array of plain objects and not an array of instances
 *
 *      and when I create some more mocks from the same builder reference
 *        then return an array of instances and not of plain objects
 *
 *
 *    when I want to ignore or re-mock some of the properties of the target class
 *      specifically setting up some permanent values of 'points' and 'isAwesome'
 *        then return the values I have asked to override everytime I create a new mock
 *          and it should work for a single mock method
 *          and it should work also for a few mocks method
 *
 *        and now I want to mock a property once (specifically the one that I overridden before)
 *          then return a mock including the property with the value I ask to mock once
 *
 *          and I ask to create another mock
 *            then do not use the value of the property that I asked before
 *
 *      specifically ignoring the 'points' property
 */
