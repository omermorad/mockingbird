import { Property } from '@mockinbird/reflect';
import { Class } from '@mockinbird/types';
import { AbstractValueHandler } from './abstract-value-handler';
import { ValueHandler } from '../types/value-handler.interface';
import { isPrimitive } from '../common/is-primitive';
import { ClassAnalyzer } from '../lib/analyzer/class-analyzer';

export class SingleClassValueHandler extends AbstractValueHandler implements ValueHandler {
  public shouldHandle(property: Property): boolean {
    return property.decoratorValue.isCallback() && !isPrimitive(property.constructorName);
  }

  public produceValue<TClass>(property: Property): TClass {
    const analyzer = ClassAnalyzer.create<TClass>(property.decoratorValue.value as Class<TClass>, this.faker);
    return analyzer.analyzeProps();
  }
}
