import { Property, ClassReflector } from '@mockinbird/reflect';
import { Faker, Class } from '@mockinbird/types';
import { CallbackValueHandler } from '../handlers/callback-value-handler';
import { ObjectLiteralValueHandler } from '../handlers/object-literal-value-handler';
import { EnumValueHandler } from '../handlers/enum-value-handler';
import { ArrayValueHandler } from '../handlers/array-value-handler';
import { SingleClassValueHandler } from '../handlers/single-class-value-handler';
import { PrimitiveValueHandler } from '../handlers/primitive-value-handler';
import { ValueHandler } from '../types/value-handler.interface';

export interface ClassParser {
  parse<TClass = any>(target: Class<TClass>): TClass;
  setFakerLocale(locale: Faker['locale']): void;
}

export class ClassParser {
  private readonly valueHandlers: Class<ValueHandler>[] = [
    EnumValueHandler,
    ArrayValueHandler,
    SingleClassValueHandler,
    CallbackValueHandler,
    ObjectLiteralValueHandler,
    PrimitiveValueHandler,
  ];

  public constructor(private readonly faker: Faker, private readonly reflector: ClassReflector) {}

  private handlePropertyValue<TClass = any>(property: Property): TClass | TClass[] {
    for (const classHandler of this.valueHandlers) {
      const handler = new classHandler(this.faker, this);

      if (handler.shouldHandle(property)) {
        return handler.produceValue<TClass>(property);
      }
    }
  }

  public setFakerLocale(locale: Faker['locale']): void {
    this.faker.setLocale(locale);
  }

  /**
   * Return an object from the target class with all the properties
   * decorated by the 'Mock' Decorator
   *
   * @param targetClass
   */
  public parse<TClass = any>(targetClass: Class<TClass>): TClass {
    if (!targetClass) {
      throw new Error(`Target class is 'undefined'`);
    }

    const classReflection = this.reflector.reflectClass(targetClass);
    const classInstance: TClass = new targetClass();

    const props = classReflection.reduce((acc, property) => {
      return { ...acc, [property.name]: this.handlePropertyValue<TClass>(property) };
    }, {});

    for (const [key, value] of Object.entries(props)) {
      classInstance[key] = value;
    }

    return classInstance;
  }
}
