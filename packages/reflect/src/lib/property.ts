import { PropertyReflection } from '@plumier/reflect';
import { DecoratorArgs } from '../types';
import { PropertyDecoratorValue } from './property-decorator-value';

export interface Property {
  readonly name: string;
  readonly constructorName: string;
  readonly propertyValue: PropertyDecoratorValue;
}

export class Property {
  constructor(
    public readonly name: string,
    public readonly constructorName: string,
    public readonly propertyValue: PropertyDecoratorValue
  ) {}

  public static create(property: PropertyReflection, mockDecoratorValue: DecoratorArgs): Property {
    const {
      name,
      type: { name: constructorName },
    } = property;

    return new Property(name, constructorName, new PropertyDecoratorValue(mockDecoratorValue));
  }
}
