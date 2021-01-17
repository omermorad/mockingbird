import FakerStatic = Faker.FakerStatic;

export interface FixtureFactoryOptions {
  locale?: FakerStatic['locale'];
  total?: number;
}
