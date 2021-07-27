import { Class } from '@mockinbird/types';
import { MockGenerator } from '../generator/mock-generator';
import { IgnoreKeys, OverrideKeys } from './types';

type ExtraKeys<TClass> = { ignore?: IgnoreKeys<TClass>; overrides?: OverrideKeys<TClass> };

export class MockProducer<TClass = any> {
  private overrides: OverrideKeys<TClass> = {};
  private ignoreKeys: IgnoreKeys<TClass> = [];

  protected locale = 'en';

  protected constructor(private readonly targetClass: Class<TClass>, private readonly mockGenerator: MockGenerator) {}

  public setLocale(locale: string): void {
    this.locale = locale;
  }

  public createMany(count: number, combine?: ExtraKeys<TClass>): TClass[] {
    const { locale, overrides, ignoreKeys } = this;

    return this.mockGenerator.create(this.targetClass, {
      locale,
      count,
      overrides: { ...overrides, ...(combine?.overrides || {}) },
      ignore: [...ignoreKeys, ...(combine?.ignore || [])],
    }) as unknown as TClass[];
  }

  public createOne(combine?: ExtraKeys<TClass>): TClass {
    const { locale, overrides, ignoreKeys } = this;

    return this.mockGenerator.create(this.targetClass, {
      locale,
      overrides: { ...overrides, ...(combine?.overrides || {}) },
      ignore: [...ignoreKeys, ...(combine?.ignore || [])],
    }) as unknown as TClass;
  }

  public permanentOverrides(overrides: OverrideKeys<TClass>): void {
    this.overrides = overrides;
  }

  public permanentIgnoreKeys(...keys: IgnoreKeys<TClass>): void {
    this.ignoreKeys = keys;
  }
}
