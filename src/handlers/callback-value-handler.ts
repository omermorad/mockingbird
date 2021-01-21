import { ValueHandler } from '../types/value-handler.interface';
import { PropertyDto } from '../types/property-dto.interface';

import FakerStatic = Faker.FakerStatic;

export class CallbackValueHandler implements ValueHandler {
  protected static readonly PRIMITIVES = ['String', 'Boolean', 'Number', 'Date'];

  public constructor(protected readonly faker: FakerStatic) {}

  public shouldHandle(propertyDto: PropertyDto): boolean {
    return propertyDto.type === 'function' && (propertyDto.value as Function).name === '';
  }

  public produceValue<T>(propertyDto: PropertyDto): any {
    return (propertyDto.value as Function)(this.faker);
  }
}
