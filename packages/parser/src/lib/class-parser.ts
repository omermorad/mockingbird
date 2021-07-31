import { Property, ClassReflector } from '@mockinbird/reflect';
import { Faker, Class } from '@mockinbird/types';
import { CallbackValueHandler } from '../handlers/callback-value-handler';
import { ObjectLiteralValueHandler } from '../handlers/object-literal-value-handler';
import { EnumValueHandler } from '../handlers/enum-value-handler';
import { ArrayValueHandler } from '../handlers/array-value-handler';
import { SingleClassValueHandler } from '../handlers/single-class-value-handler';
import { PrimitiveValueHandler } from '../handlers/primitive-value-handler';
import { ValueHandler } from '../types/value-handler.interface';
import { ParserConfigDto } from '../types/parser-config-dto';

export interface ClassParser {
  parse<TClass = any>(target: Class<TClass>): TClass;
  parse<TClass = any>(target: Class<TClass>, config?: ParserConfigDto<TClass>): TClass;
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

  private analyzeProps<TClass = any>(targetClass: Class<TClass>, config: ParserConfigDto<TClass> = {}) {
    const classReflection = this.reflector.reflectClass(targetClass);
    const { override = {}, ignore = [] } = config;

    const handleProps = (acc, property) => {
      if (ignore.includes(property.name)) {
        return acc;
      }

      if (override.hasOwnProperty(property.name)) {
        const value = override[property.name];

        return { ...acc, [property.name]: value };
      }

      return { ...acc, [property.name]: this.handlePropertyValue<TClass>(property) };
    };

    return classReflection.reduce(handleProps, {});
  }

  /**
   * Return an object from the target class with all the properties
   * decorated by the 'Mock' Decorator
   *
   * @param targetClass
   */
  public parse<TClass = any>(targetClass: Class<TClass>): TClass;

  /**
   * Return an object from the target class with all the properties
   * decorated by the 'Mock' Decorator
   *
   * Receive some extra configurations
   *
   * @param targetClass
   * @param config
   */
  public parse<TClass = any>(targetClass: Class<TClass>, config: ParserConfigDto<TClass>): TClass;

  /**
   * Return an object from the target class with all the properties
   * decorated by the 'Mock' Decorator
   *
   * @param targetClass
   * @param config
   */
  public parse<TClass = any>(targetClass: Class<TClass>, config: ParserConfigDto<TClass> = {}): TClass {
    if (!targetClass) {
      throw new Error(`Target class is 'undefined'`);
    }

    const classInstance: TClass = new targetClass();
    const properties = this.analyzeProps(targetClass, config);

    for (const [key, value] of Object.entries(properties)) {
      classInstance[key] = value;
    }

    return classInstance;
  }
}
