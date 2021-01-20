import { ClassReflector } from './class-reflector';
import { CallbackValueInspector } from './handlers/callback-value-inspector';
import { ObjectLiteralValueInspector } from './handlers/object-literal-value-inspector';
import { EnumValueInspector } from './handlers/enum-value-inspector';
import { MultiClassValueInspector } from './handlers/multi-class-value-inspector';
import { SingleClassValueInspector } from './handlers/single-class-value-inspector';
import { PrimitiveValueInspector } from './handlers/primitive-value-inspector';
import { ClassLiteral, ClassType } from './types/class.type';
import { PropertyDto } from './types/property-dto.interface';
import { ValueInspector } from './types/value-inspector.interface';
import { IClassProcessor } from './types/iclass-processor.interface';

import FakerStatic = Faker.FakerStatic;

export class ClassProcessor<T> implements IClassProcessor<T> {
  private static readonly VALUE_INSPECTORS: ClassType<ValueInspector>[] = [
    CallbackValueInspector,
    PrimitiveValueInspector,
    MultiClassValueInspector,
    SingleClassValueInspector,
    ObjectLiteralValueInspector,
    EnumValueInspector,
  ];

  public static readonly DEFAULT_LOCALE = 'en';

  public constructor(private readonly faker: FakerStatic, private readonly reflector: ClassReflector, locale: string) {
    this.faker.setLocale(locale);
  }

  private handlePropertyValue(propertyDto: PropertyDto): T | T[] {
    for (const inspectorClass of ClassProcessor.VALUE_INSPECTORS) {
      const inspector = new inspectorClass(this.faker, this) as ValueInspector;

      if (inspector.shouldInspect(propertyDto)) {
        return inspector.deduceValue<T>(propertyDto);
      }
    }

    return null;
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

    const classReflection = this.reflector.reflectClass(target);

    return classReflection.reduce((acc, val) => {
      return { ...acc, [val.name]: this.handlePropertyValue(val) };
    }, {});
  }
}
