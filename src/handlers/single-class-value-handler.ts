import { ValueHandler } from '../types/value-handler.interface';
import { Property } from '../property';
import { Class } from '../types/mock-options.type';
import { isPrimitive } from '../common/is-primitive';
import { AbstractValueHandler } from './abstract-value-handler';

export class SingleClassValueHandler<P extends Class> extends AbstractValueHandler implements ValueHandler<P> {
  public shouldHandle(property: Property<P>): boolean {
    return property.decoratorValue.isFunction() && !isPrimitive(property.constructorName);
  }

  public produceValue<T>(propertyDto: Property<P>): any {
    return this.classProcessor.process(propertyDto.decoratorValue.value as Class);
  }
}
