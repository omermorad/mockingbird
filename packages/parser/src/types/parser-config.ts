import { OptionalClassValues } from '@mockinbird/types';

export interface ParserConfig<TClass> {
  mutations?: OptionalClassValues<TClass>;
  ignore?: (keyof TClass)[];
}
