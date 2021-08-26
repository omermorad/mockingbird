import { Service } from 'typedi';
import { Property } from '@mockinbird/reflect';
import { Class, isPrimitive } from '@mockinbird/common';
import { ValueHandler } from '../types/value-handler.interface';
import { ClassAnalyzer } from '../lib/analyzer/class-analyzer';

@Service()
export class SingleClassValueHandler implements ValueHandler {
  public shouldHandle(property: Property): boolean {
    return property.decoratorValue.isCallback() && !isPrimitive(property.constructorName);
  }

  public produceValue<TClass>(property: Property): TClass {
    const analyzer = ClassAnalyzer.create<TClass>(property.decoratorValue.value as Class<TClass>);
    return analyzer.analyzeProps();
  }
}
