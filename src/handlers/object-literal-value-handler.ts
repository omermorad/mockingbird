import { MultiClassValueHandler } from './multi-class-value-handler';
import { EnumValueHandler } from './enum-value-handler';
import { ValueHandler } from '../types/value-handler.interface';
import { PropertyDto } from '../types/property-dto.interface';

export class ObjectLiteralValueHandler implements ValueHandler {
  public shouldHandle(propertyDto: PropertyDto): boolean {
    return (
      propertyDto.type === 'object' &&
      !MultiClassValueHandler.isTypeValue(propertyDto) &&
      !EnumValueHandler.isEnumValue(propertyDto)
    );
  }

  public produceValue<T>(propertyDto: PropertyDto): any {
    return propertyDto.value;
  }
}
