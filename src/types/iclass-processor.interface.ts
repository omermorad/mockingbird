import { ClassLiteral, ClassType } from './class.type';

export interface IClassProcessor<T> {
  process(target: ClassType<unknown>): ClassLiteral<T> | any;
}
