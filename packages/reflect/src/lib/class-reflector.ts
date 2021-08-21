import reflect, { ClassReflection, PropertyReflection } from '@plumier/reflect';
import { Class } from '@mockinbird/common';
import { MockOptions } from '../types';
import { MOCK_DECORATOR_NAME } from '../decorators/mock.decorator';
import { Property } from './property';
import { ClassPropsReflection } from '../types/class-reflection.type';

export class ClassReflector {
  private static instance: ClassReflector;
  public static readonly REFLECTED_CLASSES: Record<string, ClassPropsReflection> = {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

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

  public reflectClass<TClass = any>(target: Class<TClass>): ClassPropsReflection {
    if (!ClassReflector.REFLECTED_CLASSES.hasOwnProperty(target.name)) {
      ClassReflector.REFLECTED_CLASSES[target.name] = this.extractDecoratedProperties(reflect(target));
    }

    return ClassReflector.REFLECTED_CLASSES[target.name];
  }

  public static getInstance(): ClassReflector {
    if (!ClassReflector.instance) {
      ClassReflector.instance = new ClassReflector();
    }

    return ClassReflector.instance;
  }
}
