import { ValueInspector } from '../types/value-inspector.interface';
import { PropertyDto } from '../types/property-dto.interface';
import { PrimitiveHandlerAbstract } from './primitive-handler-abstract';

import FakerStatic = Faker.FakerStatic;

export class PrimitiveValueInspector extends PrimitiveHandlerAbstract implements ValueInspector {
  public constructor(protected readonly faker: FakerStatic) {
    super(faker);
  }

  public shouldInspect(propertyDto: PropertyDto): boolean {
    return this.isPrimitive(propertyDto);
  }

  public deduceValue<T>(propertyDto: PropertyDto): any {
    const { value } = propertyDto;

    if (typeof value !== 'undefined') {
      return value;
    }

    return super.generateRandomValueFromPrimitive(propertyDto.constructorName);
  }
}
