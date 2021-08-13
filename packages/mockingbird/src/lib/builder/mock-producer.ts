import { Class } from '@mockinbird/types';
import { MockGenerator } from '../generator/mock-generator';
import { IgnoreKeys, Mutations } from './types';

interface ExtraKeys<TClass> {
  ignore?: IgnoreKeys<TClass>;
  mutations?: Mutations<TClass>;
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
      mutations: config?.mutations || {},
      ignore: config?.ignore || [],
      plain: config?.plain,
    }) as unknown as TClass[];
  }

  protected createOne(config?: ExtraKeys<TClass>): TClass {
    const { locale } = this;

    return this.mockGenerator.create(this.targetClass, {
      locale,
      mutations: config?.mutations || {},
      ignore: config?.ignore || [],
      plain: config?.plain,
    }) as unknown as TClass;
  }
}
