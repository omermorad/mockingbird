import { ClassLiteral, ClassType } from './class.type';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IClassProcessor<T> {
  process(target: ClassType<T>): ClassLiteral<T>;
}
