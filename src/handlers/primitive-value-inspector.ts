import { PrimitiveHandlerAbstract } from './primitive-handler-abstract';
import { ValueInspector } from '../types/value-inspector.interface';
import { PropertyDto } from '../types/property-dto.interface';
import { MultiClassValueInspector } from '../handlers/multi-class-value-inspector';

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
      if (MultiClassValueInspector.isTypeValue(propertyDto)) {
        throw new Error(
          'Type mismatch. Properties decorated with @Fixture({ type: ClassType }) must be typed as array (e.g. prop: string[])'
        );
      }

      return value;
    }

    return super.generateRandomValueFromPrimitive(propertyDto.constructorName);
  }
}
