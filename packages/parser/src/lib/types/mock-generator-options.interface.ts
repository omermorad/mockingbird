import { ParserConfig } from '@mockingbird/parser';
import { Faker } from '@mockingbird/common';

export interface MockGeneratorOptions<TClass = any> extends ParserConfig<TClass> {
  count?: number;
  locale?: Faker['locale'];
  plain?: boolean;
}
