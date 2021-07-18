import { Callback, Type, ClassLiteral, EnumObject, ExactValue, MultiClass } from '@mockinbird/types';

export type MockOptions = Callback | ExactValue | Type | EnumObject | MultiClass;

export type GeneratedMock<TClass extends Type = any> = Type<TClass> | ClassLiteral<TClass>;
