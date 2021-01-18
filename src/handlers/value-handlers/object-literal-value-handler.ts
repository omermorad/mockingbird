import { TypeValueInspector } from 'src/handlers/value-handlers/type-value-inspector';
import { EnumValueHandler } from './enum-value-handler';
import { ValueInspector } from '../../types/value-handler.interface';
import { PropertyDto } from '../../types/property-dto.interface';

export class ObjectLiteralValueHandler implements ValueInspector {
  public shouldInspect(propertyDto: PropertyDto): boolean {
    return (
      propertyDto.type === 'object' &&
      !TypeValueInspector.isTypeValue(propertyDto) &&
      !EnumValueHandler.isEnumValue(propertyDto)
    );
  }

  public hasCircularClassFixture(): boolean {
    return false;
  }

  public deduceValue<T>(propertyDto: PropertyDto): any {
    return propertyDto.value;
  }
}
