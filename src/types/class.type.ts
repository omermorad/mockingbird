export interface ClassType<T = any> extends Function {
  new (...args: any[]): T;
}

export type ClassLiteral<T> = { [K in keyof T]: T[K] };
