import { IClassProcessor } from '../types/iclass-processor.interface';
import { ValueInspector } from '../types/value-inspector.interface';
import { PropertyDto } from '../types/property-dto.interface';
import { ClassType } from '../types/class.type';

import FakerStatic = Faker.FakerStatic;

export class CallbackValueInspector implements ValueInspector {
  protected static readonly PRIMITIVES = ['String', 'Boolean', 'Number', 'Date'];

  public constructor(protected readonly faker: FakerStatic, protected readonly classProcessor: IClassProcessor<any>) {}

  private static isConstructorNamePrimitive(propertyDto: PropertyDto): boolean {
    return CallbackValueInspector.PRIMITIVES.includes(propertyDto.constructorName);
  }

  public shouldInspect(propertyDto: PropertyDto): boolean {
    return propertyDto.type === 'function' && (propertyDto.value as Function).name === '';
  }

  public deduceValue<T>(propertyDto: PropertyDto): any {
    if (!CallbackValueInspector.isConstructorNamePrimitive(propertyDto)) {
      // ClassType
      return this.classProcessor.process(propertyDto.value as ClassType);
    }

    // Callback
    return (propertyDto.value as Function)(this.faker);
  }
}
