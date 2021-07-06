import { ValueHandler } from '../types/value-handler.interface';
import { Property } from '../property';
import { Callback } from '../types/mock-options.type';
import { AbstractValueHandler } from './abstract-value-handler';

export class CallbackValueHandler<P extends Callback> extends AbstractValueHandler implements ValueHandler<P> {
  public shouldHandle(property: Property<P>): boolean {
    return property.decoratorValue.isCallback() && (property.decoratorValue.value as Callback).name === '';
  }

  public produceValue<T>(property: Property<P>): any {
    return (property.decoratorValue.value as Callback)(this.faker);
  }
}
