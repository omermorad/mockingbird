import { ValueHandler } from '../types/value-handler.interface';
import { Property } from '../property';
import { ObjectLiteral } from '../types/mock-options.type';
import { AbstractValueHandler } from './abstract-value-handler';

export class ObjectLiteralValueHandler<P extends ObjectLiteral>
  extends AbstractValueHandler
  implements ValueHandler<P>
{
  public shouldHandle(property: Property<P>): boolean {
    const { decoratorValue } = property;
    return decoratorValue.isObject() && !decoratorValue.isMultiClass() && !decoratorValue.isEnum();
  }

  public produceValue<T>(propertyDto: Property<P>): any {
    return propertyDto.decoratorValue.value;
  }
}
