export interface ObjectLiteral {
  [key: string]: unknown;
}

export type ExactValue = string | number | boolean | ObjectLiteral | Date;
export type MultiClass = { type: Class; count: number };
export type EnumObject = { enum: object };
export type Callback = (faker: Faker.FakerStatic) => any;

export interface Class<T = any> extends Function {
  new (...args: any[]): T;
}

export type ClassLiteral<T> = { [K in keyof T]: T[K] };

export type PartialClassLiteral<T> = Partial<ClassLiteral<T>>;

export type MockedClass<T> = ClassLiteral<T> | PartialClassLiteral<T>;

export type MockOptions = Callback | ExactValue | Class | EnumObject | MultiClass;
