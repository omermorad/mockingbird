import reflect, { ClassReflection, PropertyReflection } from '@plumier/reflect';
import { ClassType } from './types/class.type';
import { FixtureOptions } from './types/fixture-options.type';
import { FIXTURE_DECORATOR_NAME } from './decorators/fixture.decorator';
import { PropertyDto } from './types/property-dto.interface';
import { ClassReflectionDto } from './types/class-reflection-dto.type';

export class ClassReflector {
  private static readonly REFLECTED_CLASSES: Record<string, ClassReflectionDto> = {};

  private extractDecoratedProperties(classReflection: ClassReflection): PropertyDto[] {
    return classReflection.properties?.map((property) => {
      const value = ClassReflector.extractFixtureDecoratorValue(property);
      return ClassReflector.createPropertyDto(property, value);
    });
  }

  private static createPropertyDto(
    property: PropertyReflection,
    fixtureDecoratorValue: FixtureOptions | null
  ): PropertyDto {
    const { name, type: { name: constructorName } = {} } = property;

    return {
      type: typeof fixtureDecoratorValue,
      value: fixtureDecoratorValue,
      name,
      constructorName,
    };
  }

  private static extractFixtureDecoratorValue(property: PropertyReflection): FixtureOptions | null {
    const { decorators = [] } = property;
    const fixtureDecorator = decorators.find((decorator) => decorator.type === FIXTURE_DECORATOR_NAME);

    return fixtureDecorator ? fixtureDecorator.value : null;
  }

  public getReflectedClassByName(targetName: string): ClassReflectionDto | undefined {
    return ClassReflector.REFLECTED_CLASSES[targetName];
  }

  public reflectClass(target: ClassType<unknown>): ClassReflectionDto {
    if (!ClassReflector.REFLECTED_CLASSES.hasOwnProperty(target.name)) {
      ClassReflector.REFLECTED_CLASSES[target.name] = this.extractDecoratedProperties(reflect(target));
    }

    return ClassReflector.REFLECTED_CLASSES[target.name];
  }
}
