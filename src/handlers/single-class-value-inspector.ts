import { PrimitiveHandlerAbstract } from './primitive-handler-abstract';
import { ClassProcessor } from '../class-processor';
import { ValueInspector } from '../types/value-inspector.interface';
import { PropertyDto } from '../types/property-dto.interface';
import { ClassType } from '../types/class.type';

import FakerStatic = Faker.FakerStatic;

export class SingleClassValueInspector extends PrimitiveHandlerAbstract implements ValueInspector {
  public constructor(protected readonly faker: FakerStatic, protected readonly classProcessor: ClassProcessor<any>) {
    super(faker);
  }

  public shouldInspect(propertyDto: PropertyDto): boolean {
    return propertyDto.type === 'function' && !this.isConstructorNamePrimitive(propertyDto);
  }

  public deduceValue<T>(propertyDto: PropertyDto): any {
    return this.classProcessor.process(propertyDto.value as ClassType);
  }
}
