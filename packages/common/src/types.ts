import faker from 'faker';
import FakerStatic = Faker.FakerStatic;

export type Faker = FakerStatic;
export const Faker = faker;

export interface ObjectLiteral {
  [key: string]: unknown;
}

export type Class<T = any> = new (...args: any[]) => T;

export type AbsoluteValue = string | number | boolean | ObjectLiteral | RegExp | Date;

export type FakerCallback = (faker: Faker) => any;

export type LazyType<T = any> = () => Class<T>;

export type Enum<E> = Record<keyof E, number | string> & { [key: number]: string };

export type LazyEnum<E = any> = { enum: () => Enum<E> };

export type ClassLiteral<TClass = any> = { [K in keyof TClass]: TClass[K] };

export type OptionalClassValues<TClass> = Partial<ClassLiteral<TClass>>;
