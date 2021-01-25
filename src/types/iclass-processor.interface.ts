import { ClassLiteral, Class } from './fixture-options.type';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IClassProcessor<T> {
  process(target: Class<T>): ClassLiteral<T>;
}
