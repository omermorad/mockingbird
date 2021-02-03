import { ClassReflector } from './class-reflector';
import { CallbackValueHandler } from './handlers/callback-value-handler';
import { ObjectLiteralValueHandler } from './handlers/object-literal-value-handler';
import { EnumValueHandler } from './handlers/enum-value-handler';
import { ArrayValueHandler } from './handlers/array-value-handler';
import { SingleClassValueHandler } from './handlers/single-class-value-handler';
import { PrimitiveValueHandler } from './handlers/primitive-value-handler';
import { ClassLiteral, Class, MockOptions } from './types/mock-options.type';
import { PropertyDto } from './types/property-dto.interface';
import { ValueHandler } from './types/value-handler.interface';
import { IClassProcessor } from './types/iclass-processor.interface';

import FakerStatic = Faker.FakerStatic;

export class ClassProcessor<T> implements IClassProcessor<T> {
  private static readonly VALUE_INSPECTORS: Class<ValueHandler<MockOptions>>[] = [
    EnumValueHandler,
    ArrayValueHandler,
    SingleClassValueHandler,
    CallbackValueHandler,
    ObjectLiteralValueHandler,
    PrimitiveValueHandler,
  ];

  public static readonly DEFAULT_LOCALE = 'en';

  public constructor(private readonly faker: FakerStatic, private readonly reflector: ClassReflector, locale: string) {
    this.faker.setLocale(locale);
  }

  private handlePropertyValue(propertyDto: PropertyDto<MockOptions>): T | T[] {
    for (const inspectorClass of ClassProcessor.VALUE_INSPECTORS) {
      const inspector = new inspectorClass(this.faker, this) as ValueHandler<MockOptions>;

      if (inspector.shouldHandle(propertyDto)) {
        return inspector.produceValue<T>(propertyDto);
      }
    }
  }

  /**
   * Return an object from the target class with all the properties
   * decorated by the 'Mock' Decorator
   *
   * @param target
   */
  public process(target: Class<T>): ClassLiteral<T> {
    if (!target) {
      throw new Error(`Target class '${target}' is 'undefined'`);
    }

    const classReflection = this.reflector.reflectClass(target);

    return classReflection.reduce((acc, val) => {
      return { ...acc, [val.name]: this.handlePropertyValue(val) };
    }, {});
  }
}
