import { FixtureOptions } from './fixture-options.type';

export interface PropertyDto {
  value: FixtureOptions;
  name: string;
  constructorName: string;
  type: string;
}
