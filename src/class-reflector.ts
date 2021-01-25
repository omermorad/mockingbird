import reflect, { ClassReflection, PropertyReflection } from '@plumier/reflect';
import { Class } from './types/fixture-options.type';
import { FixtureOptions } from './types/fixture-options.type';
import { FIXTURE_DECORATOR_NAME } from './decorators/fixture.decorator';
import { PropertyDto } from './types/property-dto.interface';
import { ClassReflectionDto } from './types/class-reflection-dto.type';

export class ClassReflector {
  public static readonly REFLECTED_CLASSES: Record<string, ClassReflectionDto> = {};

  private extractDecoratedProperties(classReflection: ClassReflection): PropertyDto<FixtureOptions>[] {
    return classReflection.properties.map((property) => {
      const value = ClassReflector.extractFixtureDecoratorValue(property);
      return ClassReflector.createPropertyDto(property, value);
    });
  }

  private static createPropertyDto(
    property: PropertyReflection,
    fixtureDecoratorValue: FixtureOptions | null
  ): PropertyDto<FixtureOptions> {
    const {
      name,
      type: { name: constructorName },
    } = property;

    return {
      type: typeof fixtureDecoratorValue,
      value: fixtureDecoratorValue,
      name,
      constructorName,
    };
  }

  private static extractFixtureDecoratorValue(property: PropertyReflection): FixtureOptions | null {
    const { decorators } = property;
    const fixtureDecorator = decorators.find((decorator) => decorator.type === FIXTURE_DECORATOR_NAME);

    return fixtureDecorator ? fixtureDecorator.value : null;
  }

  public reflectClass(target: Class<unknown>): ClassReflectionDto {
    if (!ClassReflector.REFLECTED_CLASSES.hasOwnProperty(target.name)) {
      ClassReflector.REFLECTED_CLASSES[target.name] = this.extractDecoratedProperties(reflect(target));
    }

    return ClassReflector.REFLECTED_CLASSES[target.name];
  }
}
