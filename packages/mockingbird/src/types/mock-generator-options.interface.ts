import { Faker } from '@mockinbird/common';
import { ParserConfig } from '@mockinbird/parser';

export interface MockGeneratorOptions<TClass = any> extends ParserConfig<TClass> {
  count?: number;
  locale?: Faker['locale'];
  plain?: boolean;
}
