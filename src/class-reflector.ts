import reflect, { ClassReflection, PropertyReflection } from '@plumier/reflect';
import { Class } from './types/fixture-options.type';
import { FixtureOptions } from './types/fixture-options.type';
import { FIXTURE_DECORATOR_NAME } from './decorators/fixture.decorator';
import { PropertyInterface } from './types/property.interface';
import { ClassReflectionDto } from './types/class-reflection-dto.type';
import { Property } from './property';

export class ClassReflector {
  public static readonly REFLECTED_CLASSES: Record<string, ClassReflectionDto> = {};

  private extractDecoratedProperties(classReflection: ClassReflection): PropertyInterface<FixtureOptions>[] {
    return classReflection.properties.map((property) => {
      const value = ClassReflector.extractFixtureDecoratorValue(property);

      return Property.create(property, value);
    });
  }

  private static extractFixtureDecoratorValue(property: PropertyReflection): FixtureOptions | undefined {
    const { decorators } = property;
    const fixtureDecorator = decorators.find((decorator) => decorator.type === FIXTURE_DECORATOR_NAME);

    return fixtureDecorator.value;
  }

  public reflectClass(target: Class<unknown>): ClassReflectionDto {
    if (!ClassReflector.REFLECTED_CLASSES.hasOwnProperty(target.name)) {
      ClassReflector.REFLECTED_CLASSES[target.name] = this.extractDecoratedProperties(reflect(target));
    }

    return ClassReflector.REFLECTED_CLASSES[target.name];
  }
}
