import { ValueHandler } from '../types/value-handler.interface';
import { Property } from '../lib/property';
import { AbstractValueHandler } from './abstract-value-handler';

export class ObjectLiteralValueHandler extends AbstractValueHandler implements ValueHandler {
  public shouldHandle(property: Property): boolean {
    const { decoratorValue } = property;
    return decoratorValue.isObject() && !decoratorValue.isMultiClass() && !decoratorValue.isEnum();
  }

  public produceValue(propertyDto: Property): any {
    return propertyDto.decoratorValue.value;
  }
}
