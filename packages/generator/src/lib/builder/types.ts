import { ParserConfigDto } from '@mockinbird/parser';
import { ClassLiteral } from '@mockinbird/types';

export type GeneratedMock<TClass> = TClass | ClassLiteral<TClass> | TClass[] | ClassLiteral<TClass>[];

export type IgnoreKeys<TClass> = ParserConfigDto<TClass>['ignore'];
export type OverrideKeys<TClass> = ParserConfigDto<TClass>['override'];
