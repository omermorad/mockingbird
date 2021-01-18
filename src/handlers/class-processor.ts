import reflect, { ClassReflection, PropertyReflection } from '@plumier/reflect';
import { ClassLiteral, ClassType } from '../types';
import { FixtureOptions } from '../types';
import { PropertyDto } from '../types/property-dto.interface';
import { FIXTURE_DECORATOR_NAME } from '../decorators';
import FakerStatic = Faker.FakerStatic;
import { ValueHandler } from '../types/value-handler.interface';
import { FunctionValueHandler } from './value-handlers/function-value-handler';
import { ObjectValueHandler } from './value-handlers/object-value-handler';
import { PrimitiveValueHandler } from './value-handlers/primitive-value-handler';

export class ClassProcessor<T> {
  public static readonly DEFAULT_LOCALE = 'en';

  private static readonly REFLECTED_CLASSES: Record<string, ClassReflection> = {};

  protected static readonly VALUE_HANDLERS: ClassType<ValueHandler>[] = [
    PrimitiveValueHandler,
    FunctionValueHandler,
    ObjectValueHandler,
  ];

  public constructor(private readonly faker: FakerStatic, locale: string) {
    this.faker.setLocale(locale);
  }

  /**
   *
   * @param target
   */
  public process(target: ClassType<unknown>): ClassLiteral<T> | any {
    if (!target) {
      throw new Error(`Target class '${target}' is 'undefined'`);
    }

    const classReflection = ClassProcessor.getClassReflection(target);

    return classReflection.properties?.reduce((acc, val) => {
      const fixtureDecoratorValue = ClassProcessor.extractFixtureDecoratorValue(val);

      const dto = ClassProcessor.createValueDto(val, fixtureDecoratorValue);

      return { ...acc, [val.name]: this.handlePropertyValue(dto, classReflection) };
    }, {}) as ClassLiteral<T>;
  }

  private handlePropertyValue(propertyDto: PropertyDto, parentClassReflection: ClassReflection): any | any[] {
    for (const handlerClass of ClassProcessor.VALUE_HANDLERS) {
      const handler = new handlerClass();

      if (handler.shouldHandle(propertyDto)) {
        if (handler.detectCircularClassFixture(parentClassReflection, propertyDto)) {
          throw Error(
            `Circular class-type fixture detected! Target: ${parentClassReflection.name}; Property: ${propertyDto.name}`
          );
        }

        return handler.handle(propertyDto, this, this.faker);
      }
    }

    return null;
  }

  private static getClassReflection(target: ClassType<unknown>): ClassReflection {
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
}
