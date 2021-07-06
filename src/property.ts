import { PropertyReflection } from '@plumier/reflect';
import { MockOptions } from './types/mock-options.type';
import { PropertyDecoratorValue } from './property-decorator-value';

export interface Property<T extends MockOptions> {
  readonly name: string;
  readonly constructorName: string;
  readonly decoratorValue: PropertyDecoratorValue<T>;
}

export class Property<T extends MockOptions> implements Property<T> {
  constructor(
    public readonly name: string,
    public readonly constructorName: string,
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
