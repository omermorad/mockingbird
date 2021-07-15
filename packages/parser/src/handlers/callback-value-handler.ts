import { Property } from '@mockinbird/reflect';
import { Callback } from '@mockinbird/types';
import { AbstractValueHandler } from './abstract-value-handler';
import { ValueHandler } from '../types/value-handler.interface';

export class CallbackValueHandler extends AbstractValueHandler implements ValueHandler {
  public shouldHandle(property: Property): boolean {
    return property.decoratorValue.isCallback() && (property.decoratorValue.value as Callback).name === '';
  }

  public produceValue(property: Property): any {
    return (property.decoratorValue.value as Callback)(this.faker);
  }
}
