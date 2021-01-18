import { ClassReflection } from '@plumier/reflect';
import { ValueInspector } from '../../types/value-handler.interface';
import { PropertyDto } from '../../types/property-dto.interface';
import { ClassType, FixtureOptions } from '../../types';
import { IClassProcessor } from '../../types/iclass-processor.interface';

import FakerStatic = Faker.FakerStatic;

export class TypeValueInspector implements ValueInspector {
  private static readonly DEFAULT_COUNT = 3;

  public shouldInspect(propertyDto: PropertyDto): boolean {
    return propertyDto.type === 'object' && TypeValueInspector.isTypeValue(propertyDto);
  }

  public static isTypeValue(propertyDto: PropertyDto): boolean {
    const { value = '' } = propertyDto;

    return Object.prototype.hasOwnProperty.call(value, 'type');
  }

  public deduceValue<T>(propertyDto: PropertyDto, classProcessor: IClassProcessor<T>): any {
    const { value } = propertyDto;

    if (value === null) {
      return value;
    }

    const { type: classType, count = TypeValueInspector.DEFAULT_COUNT } = value as {
      type: ClassType;
      count?: number;
    };

    const instances = new Array<any>(count);

    for (let index = 0; index < count; index++) {
      instances[index] = classProcessor.process(classType);
    }

    return instances;
  }

  public hasCircularClassFixture(parentClassReflection: ClassReflection, propertyDto: PropertyDto): boolean {
    const { type } = propertyDto.value as { type: ClassType };

    return parentClassReflection.type === type;
  }
}
