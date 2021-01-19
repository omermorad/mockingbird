import { ClassValueInspector } from './class-value-inspector';
import { EnumValueInspector } from './enum-value-inspector';
import { ValueInspector } from '../types/value-inspector.interface';
import { PropertyDto } from '../types/property-dto.interface';

export class ObjectLiteralValueInspector implements ValueInspector {
  public shouldInspect(propertyDto: PropertyDto): boolean {
    return (
      propertyDto.type === 'object' &&
      !ClassValueInspector.isTypeValue(propertyDto) &&
      !EnumValueInspector.isEnumValue(propertyDto)
    );
  }

  public deduceValue<T>(propertyDto: PropertyDto): any {
    return propertyDto.value;
  }
}
