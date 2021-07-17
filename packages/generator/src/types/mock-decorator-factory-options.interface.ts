import { Faker } from '@mockinbird/types';

export interface MockDecoratorFactoryOptions {
  count: number;
  locale?: Faker['locale'];
}
