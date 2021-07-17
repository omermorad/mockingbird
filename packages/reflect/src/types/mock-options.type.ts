import { Callback, Class, ClassLiteral, EnumObject, ExactValue, MultiClass } from '@mockinbird/types';

export type MockOptions = Callback | ExactValue | Class | EnumObject | MultiClass;

export type GeneratedMock<TClass extends Class = any> = Class<TClass> | ClassLiteral<TClass>;
