import { ClassReflector } from './class-reflector';
import { CallbackValueHandler } from './handlers/callback-value-handler';
import { ObjectLiteralValueHandler } from './handlers/object-literal-value-handler';
import { EnumValueHandler } from './handlers/enum-value-handler';
import { ArrayValueHandler } from './handlers/array-value-handler';
import { SingleClassValueHandler } from './handlers/single-class-value-handler';
import { PrimitiveValueHandler } from './handlers/primitive-value-handler';
import { ClassLiteral, Class } from './types/mock-options.type';
import { Property } from './property';
import { ValueHandler } from './types/value-handler.interface';

import FakerStatic = Faker.FakerStatic;

export interface ClassProcessor<T> {
  process(target: Class<T>): ClassLiteral<T>;
}

export class ClassProcessor<T> {
  private static readonly VALUE_HANDLERS: Class<ValueHandler>[] = [
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

  private handlePropertyValue(property: Property): T | T[] {
    for (const inspectorClass of ClassProcessor.VALUE_HANDLERS) {
      const inspector = new inspectorClass(this.faker, this);

      if (inspector.shouldHandle(property)) {
        return inspector.produceValue<T>(property);
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
    }, {}) as ClassLiteral<T>;
  }
}
