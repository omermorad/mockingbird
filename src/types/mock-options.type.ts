export interface ObjectLiteral {
  [key: string]: any;
}

export type ExactValue = string | number | boolean | ObjectLiteral | Date;

export type MultiClass = { type: Class; count: number };

export type EnumObject = { enum: Record<string, unknown> };

export type Callback = (faker: Faker.FakerStatic) => any;

export interface Class<T = any> extends Function {
  new (...args: any[]): T;
}

export type ClassLiteral<TClass extends any = any> = { [K in keyof TClass]: TClass[K] };

export type MockOptions = Callback | ExactValue | Class | EnumObject | MultiClass;
