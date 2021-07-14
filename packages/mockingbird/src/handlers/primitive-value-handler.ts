import { PrimitiveHandlerAbstract } from './primitive-handler-abstract';
import { ValueHandler } from '../types/value-handler.interface';
import { Property } from '../lib/property';

export class PrimitiveValueHandler extends PrimitiveHandlerAbstract implements ValueHandler {
  public shouldHandle(property: Property): boolean {
    return this.isPrimitive(property);
  }

  public produceValue(property: Property): any {
    const { decoratorValue } = property;

    if (typeof decoratorValue.value !== 'undefined') {
      if (decoratorValue.isMultiClass()) {
        throw new Error(
          'Type mismatch. Properties decorated with @Mock({ type: ClassType }) must be typed as array (e.g. prop: string[])'
        );
      }

      return decoratorValue.value;
    }

    return super.generateRandomValueFromPrimitive(property.constructorName);
  }
}
