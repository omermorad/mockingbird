import { FixtureOptions } from '../types/fixture-options.type';
import { Property } from '../property';

export interface ValueHandler<P extends FixtureOptions> {
  shouldHandle(property: Property<P>): boolean;
  produceValue<T>(property: Property<P>): T | T[];
}
