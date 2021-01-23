import { FixtureOptions } from './fixture-options.type';

// TODO: Make generic
export interface PropertyDto<T extends FixtureOptions> {
  value: T;
  name: string;
  constructorName: string;
  type: string;
}
