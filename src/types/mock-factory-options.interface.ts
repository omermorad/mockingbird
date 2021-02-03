import FakerStatic = Faker.FakerStatic;

export interface MockFactoryOptions {
  count: number;
  locale?: FakerStatic['locale'];
}
