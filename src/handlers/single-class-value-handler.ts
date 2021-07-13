import { ValueHandler } from '../types/value-handler.interface';
import { Property } from '../lib/property';
import { Class } from '../types/mock-options.type';
import { isPrimitive } from '../common/is-primitive';
import { AbstractValueHandler } from './abstract-value-handler';

export class SingleClassValueHandler extends AbstractValueHandler implements ValueHandler {
  public shouldHandle(property: Property): boolean {
    return property.decoratorValue.isFunction() && !isPrimitive(property.constructorName);
  }

  public produceValue(propertyDto: Property): any {
    return this.classProcessor.process(propertyDto.decoratorValue.value as Class);
  }
}
