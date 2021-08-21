import { Faker } from '@mockinbird/common';

export interface MockDecoratorFactoryOptions {
  count: number;
  locale?: Faker['locale'];
}
