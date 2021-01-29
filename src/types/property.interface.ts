import { FixtureOptions } from './fixture-options.type';
import { PropertyDecoratorValue } from '../property-decorator-value';

export interface PropertyInterface<T extends FixtureOptions> {
  name: string;
  constructorName: string;
  decoratorValue: PropertyDecoratorValue<T>;
}
