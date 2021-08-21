import { Faker } from '@mockinbird/types';
import { ParserConfig } from '@mockinbird/parser';

export interface MockGeneratorOptions<TClass = any> extends ParserConfig<TClass> {
  count?: number;
  locale?: Faker['locale'];
  plain?: boolean;
}
