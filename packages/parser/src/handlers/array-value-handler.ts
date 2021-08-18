import { Property } from '@mockinbird/reflect';
import { ExactValue, MultiClass } from '@mockinbird/types';
import { PrimitiveHandlerAbstract } from './primitive-handler-abstract';
import { ValueHandler } from '../types/value-handler.interface';
import { isPrimitive } from '../common/is-primitive';
import { ClassAnalyzer } from '../lib/analyzer/class-analyzer';

export class ArrayValueHandler extends PrimitiveHandlerAbstract implements ValueHandler {
  public shouldHandle(property: Property): boolean {
    return property.decoratorValue.isMultiClass();
  }

  public produceValue<TClass = any>(property: Property): any[] {
    const { decoratorValue } = property;

    if (decoratorValue.value === null) {
      return null;
    }

    const { count, type } = decoratorValue.value as MultiClass;

    if (isPrimitive(type.name)) {
      const instances = new Array<ExactValue>(count);

      for (let index = 0; index < count; index++) {
        instances[index] = super.generateRandomValueFromPrimitive(type.name);
      }

      return instances;
    }

    const instances = new Array<TClass>(count);
    const analyzer = ClassAnalyzer.create<TClass>(type, this.faker);

    for (let index = 0; index < count; index++) {
      instances[index] = analyzer.analyzeProps();
    }

    return instances;
  }
}
