import reflect, { ClassReflection, PropertyReflection } from '@plumier/reflect';
import { Class } from './types/mock-options.type';
import { MockOptions } from './types/mock-options.type';
import { FIXTURE_DECORATOR_NAME } from './decorators/mock.decorator';
import { PropertyDto } from './types/property-dto.interface';
import { ClassReflectionDto } from './types/class-reflection-dto.type';

export class ClassReflector {
  public static readonly REFLECTED_CLASSES: Record<string, ClassReflectionDto> = {};

  private extractDecoratedProperties(classReflection: ClassReflection): PropertyDto<MockOptions>[] {
    return classReflection.properties.map((property) => {
      const value = ClassReflector.extractMockDecoratorValue(property);
      return ClassReflector.createPropertyDto(property, value);
    });
  }

  private static createPropertyDto(
    property: PropertyReflection,
    mockDecoratorValue: MockOptions | null
  ): PropertyDto<MockOptions> {
    const {
      name,
      type: { name: constructorName },
    } = property;

    return {
      type: typeof mockDecoratorValue,
      value: mockDecoratorValue,
      name,
      constructorName,
    };
  }

  private static extractMockDecoratorValue(property: PropertyReflection): MockOptions | undefined {
    const { decorators } = property;
    const mockDecorator = decorators.find((decorator) => decorator.type === FIXTURE_DECORATOR_NAME);

    return mockDecorator.value;
  }

  public reflectClass(target: Class<unknown>): ClassReflectionDto {
    if (!ClassReflector.REFLECTED_CLASSES.hasOwnProperty(target.name)) {
      ClassReflector.REFLECTED_CLASSES[target.name] = this.extractDecoratedProperties(reflect(target));
    }

    return ClassReflector.REFLECTED_CLASSES[target.name];
  }
}
