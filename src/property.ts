import { PropertyReflection } from '@plumier/reflect';
import { FixtureOptions } from './types/fixture-options.type';
import { PropertyInterface } from './types/property.interface';
import { PropertyDecoratorValue } from './property-decorator-value';

export class Property<T extends FixtureOptions> implements PropertyInterface<T> {
  constructor(readonly name, readonly constructorName, readonly decoratorValue: PropertyDecoratorValue<T>) {}
  public static create(
    property: PropertyReflection,
    fixtureDecoratorValue: FixtureOptions | null
  ): Property<FixtureOptions> {
    const {
      name,
      type: { name: constructorName },
    } = property;

    return new Property(name, constructorName, new PropertyDecoratorValue(fixtureDecoratorValue));
  }
}
