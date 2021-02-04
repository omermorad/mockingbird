import { MockOptions } from './mock-options.type';
import { PropertyDecoratorValue } from '../property-decorator-value';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IProperty<T extends MockOptions> {
  name: string;
  constructorName: string;
  decoratorValue: PropertyDecoratorValue<T>;
}
