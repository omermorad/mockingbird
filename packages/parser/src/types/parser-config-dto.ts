import { ClassKeysWithFaker } from '@mockinbird/types';

export interface ParserConfigDto<TClass> {
  overrides?: ClassKeysWithFaker<TClass>;
  ignore?: (keyof TClass)[];
}
