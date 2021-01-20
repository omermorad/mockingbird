import { ValueInspector } from '../types/value-inspector.interface';
import { PropertyDto } from '../types/property-dto.interface';

import FakerStatic = Faker.FakerStatic;

export class CallbackValueInspector implements ValueInspector {
  protected static readonly PRIMITIVES = ['String', 'Boolean', 'Number', 'Date'];

  public constructor(protected readonly faker: FakerStatic) {}

  public shouldInspect(propertyDto: PropertyDto): boolean {
    return propertyDto.type === 'function' && (propertyDto.value as Function).name === '';
  }

  public deduceValue<T>(propertyDto: PropertyDto): any {
    return (propertyDto.value as Function)(this.faker);
  }
}
