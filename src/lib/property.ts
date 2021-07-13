import { PropertyReflection } from '@plumier/reflect';
import { MockOptions } from '../types/mock-options.type';
import { PropertyDecoratorValue } from './property-decorator-value';

export interface Property {
  readonly name: string;
  readonly constructorName: string;
  readonly decoratorValue: PropertyDecoratorValue;
}

export class Property {
  constructor(
    public readonly name: string,
    public readonly constructorName: string,
    public readonly decoratorValue: PropertyDecoratorValue
  ) {}

  public static create(property: PropertyReflection, mockDecoratorValue: MockOptions | null): Property {
    const {
      name,
      type: { name: constructorName },
    } = property;

    return new Property(name, constructorName, new PropertyDecoratorValue(mockDecoratorValue));
  }
}
