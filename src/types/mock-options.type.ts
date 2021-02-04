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

export type ClassLiteral<T> = Partial<{ [K in keyof T]: T[K] }>;

export type MockOptions = Callback | ExactValue | Class | EnumObject | MultiClass;
