import { ValueHandler } from '../types/value-handler.interface';
import { Property } from '../lib/property';
import { Callback } from '../types/mock-options.type';
import { AbstractValueHandler } from './abstract-value-handler';

export class CallbackValueHandler extends AbstractValueHandler implements ValueHandler {
  public shouldHandle(property: Property): boolean {
    return property.decoratorValue.isCallback() && (property.decoratorValue.value as Callback).name === '';
  }

  public produceValue(property: Property): any {
    return (property.decoratorValue.value as Callback)(this.faker);
  }
}
