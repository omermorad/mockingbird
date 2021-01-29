import { ValueHandler } from '../types/value-handler.interface';
import { PropertyInterface } from '../types/property.interface';
import { Class } from '../types/fixture-options.type';
import { isPrimitive } from '../utils/isPrimitive';
import { AbstractValueHandler } from './abstract-value-handler';

export class SingleClassValueHandler<P extends Class> extends AbstractValueHandler implements ValueHandler<P> {
  public shouldHandle(property: PropertyInterface<P>): boolean {
    return property.decoratorValue.isFunction() && !isPrimitive(property.constructorName);
  }

  public produceValue<T>(propertyDto: PropertyInterface<P>): any {
    return this.classProcessor.process(propertyDto.decoratorValue.value as Class);
  }
}
