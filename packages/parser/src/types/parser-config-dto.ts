import { OptionalClassValues } from '@mockinbird/types';

export interface ParserConfigDto<TClass> {
  override?: OptionalClassValues<TClass>;
  ignore?: (keyof TClass)[];
}
