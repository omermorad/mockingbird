import { Service } from 'typedi';
import { isPrimitive } from '@mockinbird/common';
import { Property } from '@mockinbird/reflect';
import { ExactValue, MultiClass } from '@mockinbird/common';
import { PrimitiveHandler } from './primitive-handler';
import { ValueHandler } from '../types/value-handler.interface';
import { ClassAnalyzer } from '../lib/analyzer/class-analyzer';

@Service()
export class ArrayValueHandler implements ValueHandler {
  public constructor(private readonly primitiveHandler: PrimitiveHandler) {}

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
        instances[index] = this.primitiveHandler.generateRandomValueFromPrimitive(type.name);
      }

      return instances;
    }

    const instances = new Array<TClass>(count);
    const analyzer = ClassAnalyzer.create<TClass>(type);

    for (let index = 0; index < count; index++) {
      instances[index] = analyzer.analyzeProps();
    }

    return instances;
  }
}
