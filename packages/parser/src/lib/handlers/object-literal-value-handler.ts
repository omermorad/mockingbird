import { Property } from '@mockingbird/reflect';
import { ValueHandler } from '../types/value-handler.interface';
import { Service } from 'typedi';

@Service()
export class ObjectLiteralValueHandler implements ValueHandler {
  public shouldHandle(property: Property): boolean {
    const { propertyValue } = property;

    return propertyValue.isObject() && !propertyValue.isArrayOfClasses() && !propertyValue.isEnum();
  }

  public produceValue(propertyDto: Property): any {
    return propertyDto.propertyValue.decorator.value;
  }
}
