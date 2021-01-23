import { ClassLiteral, ClassType } from './fixture-options.type';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IClassProcessor<T> {
  process(target: ClassType<T>): ClassLiteral<T>;
}
