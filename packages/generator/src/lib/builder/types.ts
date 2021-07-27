import { ParserConfigDto } from '@mockinbird/parser';
import { MockBuilder } from './mock-builder';

export type KeyOf<TClass> = keyof TClass;

export type ToBe = { toBe: (value: any) => void };

export type Always<TClass> = {
  setValues(overrides: ParserConfigDto<TClass>['overrides']): void;
  ignore(...keys: ParserConfigDto<TClass>['ignore']): MockBuilder<TClass>;
  setValueOf(key: KeyOf<TClass>): ToBe;
};

export type IgnoreKeys<TClass> = ParserConfigDto<TClass>['ignore'];
export type OverrideKeys<TClass> = ParserConfigDto<TClass>['overrides'];
