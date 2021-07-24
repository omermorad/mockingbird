import { Faker } from '@mockinbird/types';
import { ParserConfigDto } from '@mockinbird/parser';

export interface MockGeneratorOptions<TClass = any> extends ParserConfigDto<TClass> {
  count?: number;
  locale?: Faker['locale'];
}
