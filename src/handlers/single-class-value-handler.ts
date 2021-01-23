import { PrimitiveHandlerAbstract } from './primitive-handler-abstract';
import { ClassProcessor } from '../class-processor';
import { ValueHandler } from '../types/value-handler.interface';
import { PropertyDto } from '../types/property-dto.interface';
import { ClassType } from '../types/fixture-options.type';

import FakerStatic = Faker.FakerStatic;

export class SingleClassValueHandler<P extends ClassType>
  extends PrimitiveHandlerAbstract<P>
  implements ValueHandler<P> {
  public constructor(protected readonly faker: FakerStatic, protected readonly classProcessor: ClassProcessor<any>) {
    super(faker);
  }

  public shouldHandle(propertyDto: PropertyDto<P>): boolean {
    return propertyDto.type === 'function' && !this.isConstructorNamePrimitive(propertyDto);
  }

  public produceValue<T>(propertyDto: PropertyDto<P>): any {
    return this.classProcessor.process(propertyDto.value);
  }
}
