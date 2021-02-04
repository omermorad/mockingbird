import { ValueHandler } from '../types/value-handler.interface';
import { IProperty } from '../types/iproperty.interface';
import { Class } from '../types/mock-options.type';
import { isPrimitive } from '../common/is-primitive';
import { AbstractValueHandler } from './abstract-value-handler';

export class SingleClassValueHandler<P extends Class> extends AbstractValueHandler implements ValueHandler<P> {
  public shouldHandle(property: IProperty<P>): boolean {
    return property.decoratorValue.isFunction() && !isPrimitive(property.constructorName);
  }

  public produceValue<T>(propertyDto: IProperty<P>): any {
    return this.classProcessor.process(propertyDto.decoratorValue.value as Class);
  }
}
