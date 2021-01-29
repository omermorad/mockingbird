import { ValueHandler } from '../types/value-handler.interface';
import { PropertyInterface } from '../types/property.interface';
import { Callback } from '../types/fixture-options.type';
import { AbstractValueHandler } from './abstract-value-handler';

export class CallbackValueHandler<P extends Callback> extends AbstractValueHandler implements ValueHandler<P> {
  public shouldHandle(property: PropertyInterface<P>): boolean {
    return property.decoratorValue.isCallback() && (property.decoratorValue.value as Callback).name === '';
  }

  public produceValue<T>(property: PropertyInterface<P>): any {
    return (property.decoratorValue.value as Callback)(this.faker);
  }
}
