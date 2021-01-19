import { ClassReflection } from '@plumier/reflect';
import { ValueInspector } from '../types/value-inspector.interface';
import { PropertyDto } from '../types/property-dto.interface';
import { ClassLiteral, ClassType } from '../types/class.type';
import { MultiClass } from '../types/fixture-options.type';
import { Circular } from '../types/circular.interface';
import { ExactValue } from '../types/exact-value.type';
import { PrimitiveHandlerAbstract } from './primitive-handler-abstract';
import { ClassProcessor } from '../class-processor';

import FakerStatic = Faker.FakerStatic;

export class ClassValueInspector extends PrimitiveHandlerAbstract implements ValueInspector, Circular {
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
    return propertyDto.type === 'object' && ClassValueInspector.isTypeValue(propertyDto);
  }

  public deduceValue<T>(propertyDto: PropertyDto): any {
    const { value } = propertyDto;

    if (value === null) {
      return value;
    }

    const { count = ClassValueInspector.DEFAULT_COUNT } = value as MultiClass;

    const instances = new Array<ExactValue | ClassLiteral<T>>(count);

    if (this.isPrimitive(propertyDto)) {
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

  public hasCircularClassFixture(parentClassReflection: ClassReflection, propertyDto: PropertyDto): boolean {
    const { type } = propertyDto.value as { type: ClassType };

    return parentClassReflection.type === type;
  }
}
