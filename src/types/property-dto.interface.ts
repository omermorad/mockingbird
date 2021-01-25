import { FixtureOptions } from './fixture-options.type';

// TODO: Make generic
// TODO: refactor (2nd phase). change to class, which will contain all relevant methods which are now speared as static functions in different classes
export interface PropertyDto<T extends FixtureOptions> {
  value: T;
  name: string;
  constructorName: string;
  type: string;
}
