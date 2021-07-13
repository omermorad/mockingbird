import reflect, { ClassReflection, PropertyReflection } from '@plumier/reflect';
import { Class } from '../types/mock-options.type';
import { MockOptions } from '../types/mock-options.type';
import { MOCK_DECORATOR_NAME } from '../decorators/mock.decorator';
import { Property } from '../lib/property';
import { ClassReflectionDto } from '../types/class-reflection-dto.type';

export class ClassReflector {
  public static readonly REFLECTED_CLASSES: Record<string, ClassReflectionDto> = {};

  private static extractMockDecoratorValue(property: PropertyReflection): MockOptions | undefined {
    const { decorators } = property;
    const mockDecorator = decorators.find((decorator) => decorator.type === MOCK_DECORATOR_NAME);

    return mockDecorator.value;
  }

  private extractDecoratedProperties(classReflection: ClassReflection): Property[] {
    return classReflection.properties.map((property) => {
      const value = ClassReflector.extractMockDecoratorValue(property);

      return Property.create(property, value);
    });
  }

  public reflectClass(target: Class<unknown>): ClassReflectionDto {
    if (!ClassReflector.REFLECTED_CLASSES.hasOwnProperty(target.name)) {
      ClassReflector.REFLECTED_CLASSES[target.name] = this.extractDecoratedProperties(reflect(target));
    }

    return ClassReflector.REFLECTED_CLASSES[target.name];
  }
}
