import { ParserConfig } from '@mockinbird/parser';
import { ClassLiteral } from '@mockinbird/types';

export type GeneratedMock<TClass> = TClass | ClassLiteral<TClass> | TClass[] | ClassLiteral<TClass>[];

export type OmitKeys<TClass> = ParserConfig<TClass>['omit'];
export type IgnoreKeys<TClass> = OmitKeys<TClass>;
export type Mutations<TClass> = ParserConfig<TClass>['mutations'];
