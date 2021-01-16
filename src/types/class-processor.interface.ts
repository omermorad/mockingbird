import { ClassLiteral, ClassType } from './class.type';

export interface ClassProcessorInterface<T> {
  process(target: ClassType<unknown>): ClassLiteral<T> | any;
}
