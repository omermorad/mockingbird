import reflect, { ClassReflection, PropertyReflection } from '@plumier/reflect';
import { Class } from './types/mock-options.type';
import { MockOptions } from './types/mock-options.type';
import { MOCK_DECORATOR_NAME } from './decorators/mock.decorator';
import { IProperty } from './types/iproperty.interface';
import { ClassReflectionDto } from './types/class-reflection-dto.type';
import { Property } from './property';

export class ClassReflector {
  public static readonly REFLECTED_CLASSES: Record<string, ClassReflectionDto> = {};

  private extractDecoratedProperties(classReflection: ClassReflection): IProperty<MockOptions>[] {
    return classReflection.properties.map((property) => {
      const value = ClassReflector.extractMockDecoratorValue(property);

      return Property.create(property, value);
    });
  }

  private static extractMockDecoratorValue(property: PropertyReflection): MockOptions | undefined {
    const { decorators } = property;
    const mockDecorator = decorators.find((decorator) => decorator.type === MOCK_DECORATOR_NAME);

    return mockDecorator.value;
  }

  public reflectClass(target: Class<unknown>): ClassReflectionDto {
    if (!ClassReflector.REFLECTED_CLASSES.hasOwnProperty(target.name)) {
      ClassReflector.REFLECTED_CLASSES[target.name] = this.extractDecoratedProperties(reflect(target));
    }

    return ClassReflector.REFLECTED_CLASSES[target.name];
  }
}
