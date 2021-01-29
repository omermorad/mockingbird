import { ValueHandler } from '../types/value-handler.interface';
import { PropertyInterface } from '../types/property.interface';
import { ObjectLiteral } from '../types/fixture-options.type';
import { AbstractValueHandler } from './abstract-value-handler';

export class ObjectLiteralValueHandler<P extends ObjectLiteral>
  extends AbstractValueHandler
  implements ValueHandler<P> {
  public shouldHandle(property: PropertyInterface<P>): boolean {
    const { decoratorValue } = property;
    return decoratorValue.isObject() && !decoratorValue.isMultiClass() && !decoratorValue.isEnum();
  }

  public produceValue<T>(propertyDto: PropertyInterface<P>): any {
    return propertyDto.decoratorValue.value;
  }
}
