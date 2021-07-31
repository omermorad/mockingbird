import { Property } from '@mockinbird/reflect';
import { ExactValue, MultiClass } from '@mockinbird/types';
import { PrimitiveHandlerAbstract } from './primitive-handler-abstract';
import { ValueHandler } from '../types/value-handler.interface';
import { isPrimitive } from '../common/is-primitive';

// TODO: refactor (2nd phase). All other mock options should be wrapped with 'multiple' functionality
export class ArrayValueHandler<TClass = any> extends PrimitiveHandlerAbstract implements ValueHandler {
  public shouldHandle(property: Property): boolean {
    return property.decoratorValue.isMultiClass();
  }

  public produceValue(property: Property): any[] {
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

    const instances = new Array(count);

    for (let index = 0; index < count; index++) {
      instances[index] = this.classParser.parse<TClass>(type);
    }

    return instances;
  }
}
