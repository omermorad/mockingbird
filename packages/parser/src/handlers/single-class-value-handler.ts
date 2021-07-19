import { Property } from '@mockinbird/reflect';
import { Class } from '@mockinbird/types';
import { AbstractValueHandler } from './abstract-value-handler';
import { ValueHandler } from '../types/value-handler.interface';
import { isPrimitive } from '../common/is-primitive';

export class SingleClassValueHandler<TClass = any> extends AbstractValueHandler implements ValueHandler {
  public shouldHandle(property: Property): boolean {
    return property.decoratorValue.isCallback() && !isPrimitive(property.constructorName);
  }

  public produceValue(propertyDto: Property): any {
    return this.classParser.parse<TClass>(propertyDto.decoratorValue.value as Class<TClass>);
  }
}
