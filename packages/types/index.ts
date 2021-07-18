import faker from 'faker';
import FakerStatic = Faker.FakerStatic;

export type Faker = FakerStatic;
export const Faker = faker;

export interface ObjectLiteral {
  [key: string]: any;
}

export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}

export type ExactValue = string | number | boolean | ObjectLiteral | Date;

export type MultiClass = { type: Type; count: number };

export type EnumObject = { enum: Record<string, unknown> };

export type Callback = (faker: FakerStatic) => any;

export type ClassLiteral<TClass extends any = any> = { [K in keyof TClass]: TClass[K] };

export type MockOptions = Callback | ExactValue | Type | EnumObject | MultiClass;

export type GeneratedMock<TClass extends Type = any> = Type<TClass> | ClassLiteral<TClass>;
