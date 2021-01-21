import { PrimitiveHandlerAbstract } from './primitive-handler-abstract';
import { ValueHandler } from '../types/value-handler.interface';
import { PropertyDto } from '../types/property-dto.interface';
import { MultiClassValueHandler } from '../handlers/multi-class-value-handler';

import FakerStatic = Faker.FakerStatic;

export class PrimitiveValueHandler extends PrimitiveHandlerAbstract implements ValueHandler {
  public constructor(protected readonly faker: FakerStatic) {
    super(faker);
  }

  public shouldHandle(propertyDto: PropertyDto): boolean {
    return this.isPrimitive(propertyDto);
  }

  public produceValue<T>(propertyDto: PropertyDto): any {
    const { value } = propertyDto;

    if (typeof value !== 'undefined') {
      if (MultiClassValueHandler.isTypeValue(propertyDto)) {
        throw new Error(
          'Type mismatch. Properties decorated with @Fixture({ type: ClassType }) must be typed as array (e.g. prop: string[])'
        );
      }

      return value;
    }

    return super.generateRandomValueFromPrimitive(propertyDto.constructorName);
  }
}
