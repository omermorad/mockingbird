import { DecoratorValueArg } from './mock-options.type';
import { Property } from '../lib';

export type ClassPropsReflection = Property[];

export interface TypeFunctionValueOptions {
  count: number;
}

export type DecoratorValueOptions = TypeFunctionValueOptions;

export interface DecoratorArgs {
  value: DecoratorValueArg;
  options?: DecoratorValueOptions;
}
