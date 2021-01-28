import FakerStatic = Faker.FakerStatic;

export interface FixtureFactoryOptions {
  count: number;
  locale?: FakerStatic['locale'];
}
