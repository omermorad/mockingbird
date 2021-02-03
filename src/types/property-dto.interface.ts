import { MockOptions } from './mock-options.type';

// TODO: Make generic
// TODO: refactor (2nd phase). change to class, which will contain all relevant methods which are now speared as static functions in different classes
export interface PropertyDto<T extends MockOptions> {
  value: T;
  name: string;
  constructorName: string;
  type: string;
}
