import { Class } from '@mockinbird/common';
import { MockGenerator } from '../generator/mock-generator';
import { Keys, Mutations } from './types';

interface ExtraKeys<TClass> {
  omit?: Keys<TClass>;
  pick?: Keys<TClass>;
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

  protected createMany(count: number, config: ExtraKeys<TClass> = {}): TClass[] {
    const { locale } = this;
    const { mutations = {}, plain = false, pick = [], omit = [] } = config;

    return this.mockGenerator.create(this.targetClass, {
      locale,
      mutations,
      pick,
      omit,
      plain,
      count,
    }) as unknown as TClass[];
  }

  protected createOne(config: ExtraKeys<TClass> = {}): TClass {
    const { locale } = this;
    const { mutations = {}, plain = false, pick = [], omit = [] } = config;

    return this.mockGenerator.create(this.targetClass, {
      locale,
      mutations,
      pick,
      omit,
      plain,
    }) as unknown as TClass;
  }
}
