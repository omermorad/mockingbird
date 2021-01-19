import reflect, { ClassReflection, PropertyReflection } from '@plumier/reflect';
import { FunctionValueInspector } from './value-handlers/function-value-inspector';
import { ObjectLiteralValueInspector } from './value-handlers/object-literal-value-inspector';
import { EnumValueInspector } from './value-handlers/enum-value-inspector';
import { TypeValueInspector } from 'src/handlers/value-handlers/type-value-inspector';
import { PrimitiveValueInspector } from 'src/handlers/value-handlers/primitive-value-inspector';
import { ClassLiteral, ClassType } from '../types/class.type';
import { FixtureOptions } from '../types/fixture-options.type';
import { PropertyDto } from '../types/property-dto.interface';
import { ValueInspector } from '../types/value-inspector.interface';
import { IClassProcessor } from '../types/iclass-processor.interface';
import { FIXTURE_DECORATOR_NAME } from '../decorators/fixture.decorator';

import FakerStatic = Faker.FakerStatic;

export class ClassProcessor<T> implements IClassProcessor<T> {
  private static readonly REFLECTED_CLASSES: Record<string, ClassReflection> = {};

  private static readonly VALUE_INSPECTORS: ClassType<ValueInspector>[] = [
    PrimitiveValueInspector,
    FunctionValueInspector,
    ObjectLiteralValueInspector,
    EnumValueInspector,
    TypeValueInspector,
  ];

  public static readonly DEFAULT_LOCALE = 'en';

  public constructor(private readonly faker: FakerStatic, locale: string) {
    this.faker.setLocale(locale);
  }

  private handlePropertyValue(propertyDto: PropertyDto, parentClassReflection: ClassReflection): T {
    for (const inspectorClass of ClassProcessor.VALUE_INSPECTORS) {
      const inspector = new inspectorClass(this.faker);

      if (inspector.shouldInspect(propertyDto)) {
        if (inspector.hasCircularClassFixture(parentClassReflection, propertyDto)) {
          throw Error(
            `Circular class-type fixture detected! Target: ${parentClassReflection.name}; Property: ${propertyDto.name}`
          );
        }

        return inspector.deduceValue<T>(propertyDto, this);
      }
    }

    return null;
  }

  private static reflectClass(target: ClassType<unknown>): ClassReflection {
    if (!ClassProcessor.REFLECTED_CLASSES.hasOwnProperty(target.name)) {
      ClassProcessor.REFLECTED_CLASSES[target.name] = reflect(target);
    }

    return ClassProcessor.REFLECTED_CLASSES[target.name];
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

  /**
   * Return an object from the target class with all the properties
   * decorated by the 'Fixture' Decorator
   *
   * @param target
   */
  public process(target: ClassType<T>): ClassLiteral<T> {
    if (!target) {
      throw new Error(`Target class '${target}' is 'undefined'`);
    }

    const classReflection = ClassProcessor.reflectClass(target);

    return classReflection.properties?.reduce((acc, val) => {
      const fixtureDecoratorValue = ClassProcessor.extractFixtureDecoratorValue(val);
      const dto = ClassProcessor.createPropertyDto(val, fixtureDecoratorValue);

      return { ...acc, [val.name]: this.handlePropertyValue(dto, classReflection) };
    }, {});
  }
}
