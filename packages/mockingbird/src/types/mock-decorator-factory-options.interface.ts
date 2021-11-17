import { Faker } from '@mockingbird/common';

export interface MockDecoratorFactoryOptions {
  count: number;
  locale?: Faker['locale'];
}
