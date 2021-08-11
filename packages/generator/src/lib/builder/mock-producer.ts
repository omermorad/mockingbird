import { Class } from '@mockinbird/types';
import { MockGenerator } from '../generator/mock-generator';
import { IgnoreKeys, OverrideKeys } from './types';

interface ExtraKeys<TClass> {
  ignore?: IgnoreKeys<TClass>;
  mutations?: OverrideKeys<TClass>;
  plain?: boolean;
}

export class MockProducer<TClass = any> {
  protected locale = 'en';

  protected constructor(
    protected readonly targetClass: Class<TClass>,
    protected readonly mockGenerator: MockGenerator
  ) {}

  public setLocale(locale: string): void {
    this.locale = locale;
  }

  protected createMany(count: number, config?: ExtraKeys<TClass>): TClass[] {
    const { locale } = this;

    return this.mockGenerator.create(this.targetClass, {
      locale,
      count,
      override: config?.mutations || {},
      ignore: config?.ignore || [],
      plain: config?.plain,
    }) as unknown as TClass[];
  }

  protected createOne(config?: ExtraKeys<TClass>): TClass {
    const { locale } = this;

    return this.mockGenerator.create(this.targetClass, {
      locale,
      override: config?.mutations || {},
      ignore: config?.ignore || [],
      plain: config?.plain,
    }) as unknown as TClass;
  }
}
