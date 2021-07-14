import FakerStatic = Faker.FakerStatic;

export interface MockDecoratorFactoryOptions {
  count: number;
  locale?: FakerStatic['locale'];
}
