import { Service } from 'typedi';
import { Property } from '@mockingbird/reflect';
import { PrimitiveHandler } from './primitive-handler';
import { ValueHandler } from '../types/value-handler.interface';

@Service()
export class PrimitiveValueHandler implements ValueHandler {
  public constructor(private readonly primitiveHandler: PrimitiveHandler) {}

  public shouldHandle(property: Property): boolean {
    return this.primitiveHandler.isPrimitive(property);
  }

  public produceValue(property: Property): any {
    const { propertyValue } = property;

    if (typeof propertyValue.decorator.value !== 'undefined') {
      if (propertyValue.isArrayOfClasses()) {
        throw new Error(
          'Type mismatch. Properties decorated with @Mock({ type: ClassType }) must be typed as array (e.g. prop: string[])'
        );
      }

      return propertyValue.decorator.value;
    }

    return this.primitiveHandler.generateRandomValueFromPrimitive(property.constructorName);
  }
}
