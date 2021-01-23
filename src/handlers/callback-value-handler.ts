import { ValueHandler } from '../types/value-handler.interface';
import { PropertyDto } from '../types/property-dto.interface';
import { Callback } from '../types/fixture-options.type';

import FakerStatic = Faker.FakerStatic;

export class CallbackValueHandler<P extends Callback> implements ValueHandler<P> {
  protected static readonly PRIMITIVES = ['String', 'Boolean', 'Number', 'Date'];

  public constructor(protected readonly faker: FakerStatic) {}

  public shouldHandle(propertyDto: PropertyDto<P>): boolean {
    return propertyDto.type === 'function' && propertyDto.value.name === '';
  }

  public produceValue<T>(propertyDto: PropertyDto<P>): any {
    return propertyDto.value(this.faker);
  }
}
