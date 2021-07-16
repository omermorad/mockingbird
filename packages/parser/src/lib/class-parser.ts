import { Property, ClassReflector } from '@mockinbird/reflect';
import { Class, Faker } from '@mockinbird/types';
import { CallbackValueHandler } from '../handlers/callback-value-handler';
import { ObjectLiteralValueHandler } from '../handlers/object-literal-value-handler';
import { EnumValueHandler } from '../handlers/enum-value-handler';
import { ArrayValueHandler } from '../handlers/array-value-handler';
import { SingleClassValueHandler } from '../handlers/single-class-value-handler';
import { PrimitiveValueHandler } from '../handlers/primitive-value-handler';
import { ValueHandler } from '../types/value-handler.interface';

export interface ClassParser<T> {
  parse(target: Class<T>): T;
}

export class ClassParser<T> {
  private static readonly VALUE_HANDLERS: Class<ValueHandler>[] = [
    EnumValueHandler,
    ArrayValueHandler,
    SingleClassValueHandler,
    CallbackValueHandler,
    ObjectLiteralValueHandler,
    PrimitiveValueHandler,
  ];

  public static readonly DEFAULT_LOCALE = 'en';

  public constructor(private readonly faker: Faker, private readonly reflector: ClassReflector, locale: string) {
    this.faker.setLocale(locale);
  }

  private handlePropertyValue(property: Property): T | T[] {
    for (const classHandler of ClassParser.VALUE_HANDLERS) {
      const handler = new classHandler(this.faker, this);

      if (handler.shouldHandle(property)) {
        return handler.produceValue<T>(property);
      }
    }
  }

  /**
   * Return an object from the target class with all the properties
   * decorated by the 'Mock' Decorator
   *
   * @param targetClass
   */
  public parse(targetClass: Class<T>): T {
    if (!targetClass) {
      throw new Error(`Target class is 'undefined'`);
    }

    const classReflection = this.reflector.reflectClass(targetClass);
    const classInstance: T = new targetClass();

    const props = classReflection.reduce((acc, property) => {
      return { ...acc, [property.name]: this.handlePropertyValue(property) };
    }, {});

    for (const [key, value] of Object.entries(props)) {
      classInstance[key] = value;
    }

    return classInstance;
  }
}