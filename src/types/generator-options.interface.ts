import FakerStatic = Faker.FakerStatic;

export interface GeneratorOptions {
  locale?: FakerStatic['locale'];
  total?: number;
}
