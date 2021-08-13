import { OptionalClassValues } from '@mockinbird/types';

export interface ParserConfig<TClass> {
  mutations?: OptionalClassValues<TClass>;
  omit?: (keyof TClass)[];
}
