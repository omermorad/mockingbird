export type ExactValue = string | number | boolean | object;
export type MultiClass = { type: ClassType; count: number };
export type EnumObject = { enum: object };
export type Callback = (faker: Faker.FakerStatic) => any;

export interface ClassType<T = any> extends Function {
  new (...args: any[]): T;
}

export type ClassLiteral<T> = Partial<{ [K in keyof T]: T[K] }>;

export type FixtureOptions = Callback | ExactValue | ClassType | EnumObject | MultiClass;
