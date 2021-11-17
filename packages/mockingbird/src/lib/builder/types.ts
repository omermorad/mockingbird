import { ParserConfig } from '@mockingbird/parser';
import { ClassLiteral } from '@mockingbird/common';

export type GeneratedMock<TClass> = TClass | ClassLiteral<TClass> | TClass[] | ClassLiteral<TClass>[];

export type Keys<TClass> = ParserConfig<TClass>['omit'];
export type Mutations<TClass> = ParserConfig<TClass>['mutations'];
