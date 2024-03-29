import { Faker } from '@mockingbird/common';
import { ParserConfig } from '@mockingbird/parser';

export interface MockGeneratorOptions<TClass = any> extends ParserConfig<TClass> {
  count?: number;
  locale?: Faker['locale'];
  plain?: boolean;
}
