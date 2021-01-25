import { ArrayValueHandler } from './array-value-handler';
import { EnumValueHandler } from './enum-value-handler';
import { ValueHandler } from '../types/value-handler.interface';
import { PropertyDto } from '../types/property-dto.interface';
import { EnumObject, MultiClass, ObjectLiteral } from '../types/fixture-options.type';

export class ObjectLiteralValueHandler<P extends ObjectLiteral> implements ValueHandler<P> {
  public shouldHandle(propertyDto: PropertyDto<P>): boolean {
    return (
      propertyDto.type === 'object' &&
      !ArrayValueHandler.hasTypeKey(propertyDto as PropertyDto<MultiClass>) &&
      !EnumValueHandler.isEnumValue(propertyDto as PropertyDto<EnumObject>)
    );
  }

  public produceValue<T>(propertyDto: PropertyDto<P>): any {
    return propertyDto.value;
  }
}
