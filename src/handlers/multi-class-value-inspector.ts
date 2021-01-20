import { ValueInspector } from '../types/value-inspector.interface';
import { PropertyDto } from '../types/property-dto.interface';
import { ClassLiteral, ClassType } from '../types/class.type';
import { MultiClass } from '../types/fixture-options.type';
import { ExactValue } from '../types/exact-value.type';
import { ClassProcessor } from '../class-processor';
import { PrimitiveHandlerAbstract } from './primitive-handler-abstract';

import FakerStatic = Faker.FakerStatic;

export class MultiClassValueInspector extends PrimitiveHandlerAbstract implements ValueInspector {
  private static readonly DEFAULT_COUNT = 3;

  public constructor(
    protected readonly faker: FakerStatic,
    protected readonly classProcessor: ClassProcessor<ClassType>
  ) {
    super(faker);
  }

  public static isTypeValue(propertyDto: PropertyDto): boolean {
    const { value = '' } = propertyDto;

    return Object.prototype.hasOwnProperty.call(value, 'type');
  }

  public shouldInspect(propertyDto: PropertyDto): boolean {
    return propertyDto.type === 'object' && MultiClassValueInspector.isTypeValue(propertyDto);
  }

  public deduceValue<T>(propertyDto: PropertyDto): any {
    const { value } = propertyDto;
    const multiClassVal = value as MultiClass;

    if (value === null) {
      return value;
    }

    const { count = MultiClassValueInspector.DEFAULT_COUNT } = multiClassVal;

    const instances = new Array<ExactValue | ClassLiteral<T>>(count);

    if (
      ['String', 'Boolean', 'Number', 'Date'].includes(multiClassVal.type.name) &&
      propertyDto.constructorName === 'Array'
    ) {
      for (let index = 0; index < count; index++) {
        instances[index] = super.generateRandomValueFromPrimitive((value as MultiClass).type?.name);
      }
    } else {
      for (let index = 0; index < count; index++) {
        instances[index] = this.classProcessor.process((propertyDto.value as any).type);
      }
    }

    return instances;
  }
}
