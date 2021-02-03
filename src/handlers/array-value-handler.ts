import { ValueHandler } from '../types/value-handler.interface';
import { PropertyDto } from '../types/property-dto.interface';
import { ExactValue, Class } from '../types/mock-options.type';
import { MultiClass } from '../types/mock-options.type';
import { ClassProcessor } from '../class-processor';
import { PrimitiveHandlerAbstract } from './primitive-handler-abstract';

import FakerStatic = Faker.FakerStatic;

// TODO: refactor (2nd phase). All other mock options should be wrapped with 'multiple' functionality
export class ArrayValueHandler<P extends MultiClass> extends PrimitiveHandlerAbstract<P> implements ValueHandler<P> {
  public constructor(protected readonly faker: FakerStatic, protected readonly classProcessor: ClassProcessor<Class>) {
    super(faker);
  }

  public static hasTypeKey(propertyDto: PropertyDto<MultiClass>): boolean {
    const { value } = propertyDto;

    return Object.prototype.hasOwnProperty.call(value, 'type');
  }

  public shouldHandle(propertyDto: PropertyDto<P>): boolean {
    return propertyDto.type === 'object' && ArrayValueHandler.hasTypeKey(propertyDto);
  }

  public produceValue<T>(propertyDto: PropertyDto<P>): any {
    const { value } = propertyDto;

    if (value === null) {
      return value;
    }

    const { count, type } = value;

    if (PrimitiveHandlerAbstract.PRIMITIVES.includes(type.name)) {
      const instances = new Array<ExactValue>(count);

      for (let index = 0; index < count; index++) {
        instances[index] = super.generateRandomValueFromPrimitive(type.name);
      }

      return instances;
    }

    const instances = new Array(count);

    for (let index = 0; index < count; index++) {
      instances[index] = this.classProcessor.process(type as Class);
    }

    return instances;
  }
}
