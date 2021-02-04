import { MockOptions } from '../types/mock-options.type';
import { Property } from '../property';

export interface ValueHandler<P extends MockOptions> {
  shouldHandle(property: Property<P>): boolean;
  produceValue<T>(property: Property<P>): T | T[];
}
