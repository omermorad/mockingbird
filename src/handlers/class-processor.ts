import reflect, { ClassReflection, PropertyReflection } from '@plumier/reflect';
import { FunctionValueHandler } from './value-handlers/function-value-handler';
import { ObjectLiteralValueHandler } from './value-handlers/object-literal-value-handler';
import { EnumValueHandler } from './value-handlers/enum-value-handler';
import { TypeValueHandler } from './value-handlers/type-value-handler';
import { PrimitiveValueHandler } from './value-handlers/primitive-value-handler';
import { ClassLiteral, ClassType } from '../types/class.type';
import { FixtureOptions } from '../types/fixture-options.type';
import { PropertyDto } from '../types/property-dto.interface';
import { ValueHandler } from '../types/value-handler.interface';
import { FIXTURE_DECORATOR_NAME } from '../decorators/fixture.decorator';

import FakerStatic = Faker.FakerStatic;
import { IClassProcessor } from 'src/types/iclass-processor.interface';
export class ClassProcessor<T> implements IClassProcessor<T> {
  private static readonly REFLECTED_CLASSES: Record<string, ClassReflection> = {};

  private static readonly VALUE_HANDLERS: ClassType<ValueHandler>[] = [
    PrimitiveValueHandler,
    FunctionValueHandler,
    ObjectLiteralValueHandler,
    EnumValueHandler,
    TypeValueHandler,
  ];

  public static readonly DEFAULT_LOCALE = 'en';

  public constructor(private readonly faker: FakerStatic, locale: string) {
    this.faker.setLocale(locale);
  }

  private handlePropertyValue(propertyDto: PropertyDto, parentClassReflection: ClassReflection): T {
    for (const handlerClass of ClassProcessor.VALUE_HANDLERS) {
      const handler = new handlerClass(this.faker);

      if (handler.shouldHandle(propertyDto)) {
        if (handler.hasCircularClassFixture(parentClassReflection, propertyDto)) {
          throw Error(
            `Circular class-type fixture detected! Target: ${parentClassReflection.name}; Property: ${propertyDto.name}`
          );
        }

        return handler.handle<T>(propertyDto, this);
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

  private static createValueDto(
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
      const dto = ClassProcessor.createValueDto(val, fixtureDecoratorValue);

      return { ...acc, [val.name]: this.handlePropertyValue(dto, classReflection) };
    }, {});
  }
}
