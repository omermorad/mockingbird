import { ValueHandler } from '../types/value-handler.interface';
import { IProperty } from '../types/iproperty.interface';
import { ObjectLiteral } from '../types/mock-options.type';
import { AbstractValueHandler } from './abstract-value-handler';

export class ObjectLiteralValueHandler<P extends ObjectLiteral>
  extends AbstractValueHandler
  implements ValueHandler<P> {
  public shouldHandle(property: IProperty<P>): boolean {
    const { decoratorValue } = property;
    return decoratorValue.isObject() && !decoratorValue.isMultiClass() && !decoratorValue.isEnum();
  }

  public produceValue<T>(propertyDto: IProperty<P>): any {
    return propertyDto.decoratorValue.value;
  }
}
