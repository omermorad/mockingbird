import { PropertyReflection } from '@plumier/reflect';
import { MockOptions } from './types/mock-options.type';
import { IProperty } from './types/iproperty.interface';
import { PropertyDecoratorValue } from './property-decorator-value';

export class Property<T extends MockOptions> implements IProperty<T> {
  constructor(
    public readonly name,
    public readonly constructorName,
    public readonly decoratorValue: PropertyDecoratorValue<T>
  ) {}
  public static create(property: PropertyReflection, mockDecoratorValue: MockOptions | null): Property<MockOptions> {
    const {
      name,
      type: { name: constructorName },
    } = property;

    return new Property(name, constructorName, new PropertyDecoratorValue(mockDecoratorValue));
  }
}
