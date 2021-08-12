import { ParserConfig } from '@mockinbird/parser';
import { ClassLiteral } from '@mockinbird/types';

export type GeneratedMock<TClass> = TClass | ClassLiteral<TClass> | TClass[] | ClassLiteral<TClass>[];

export type IgnoreKeys<TClass> = ParserConfig<TClass>['ignore'];
export type Mutations<TClass> = ParserConfig<TClass>['mutations'];
