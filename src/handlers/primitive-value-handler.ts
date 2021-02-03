import { PrimitiveHandlerAbstract } from './primitive-handler-abstract';
import { ValueHandler } from '../types/value-handler.interface';
import { PropertyDto } from '../types/property-dto.interface';
import { ExactValue, MultiClass } from '../types/mock-options.type';
import { ArrayValueHandler } from './array-value-handler';

import FakerStatic = Faker.FakerStatic;

export class PrimitiveValueHandler<P extends ExactValue>
  extends PrimitiveHandlerAbstract<P>
  implements ValueHandler<P> {
  public constructor(protected readonly faker: FakerStatic) {
    super(faker);
  }

  public shouldHandle(propertyDto: PropertyDto<P>): boolean {
    return this.isPrimitive(propertyDto);
  }

  public produceValue<T>(propertyDto: PropertyDto<P>): any {
    const { value } = propertyDto;

    if (typeof value !== 'undefined') {
      if (ArrayValueHandler.hasTypeKey((propertyDto as unknown) as PropertyDto<MultiClass>)) {
        throw new Error(
          'Type mismatch. Properties decorated with @Mock({ type: ClassType }) must be typed as array (e.g. prop: string[])'
        );
      }

      return value;
    }

    return super.generateRandomValueFromPrimitive(propertyDto.constructorName);
  }
}
