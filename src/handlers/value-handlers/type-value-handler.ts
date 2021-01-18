import { ClassReflection } from '@plumier/reflect';
import { ValueHandler } from '../../types/value-handler.interface';
import { PropertyDto } from '../../types/property-dto.interface';
import { ClassType, FixtureOptions } from '../../types';
import { IClassProcessor } from '../../types/iclass-processor.interface';

import FakerStatic = Faker.FakerStatic;

export class TypeValueHandler implements ValueHandler {
  private static readonly DEFAULT_COUNT = 3;

  public shouldHandle(propertyDto: PropertyDto): boolean {
    return propertyDto.type === 'object' && TypeValueHandler.isTypeValue(propertyDto);
  }

  public static isTypeValue(propertyDto: PropertyDto): boolean {
    const { value = '' } = propertyDto;

    return Object.prototype.hasOwnProperty.call(value, 'type');
  }

  public handle<T>(propertyDto: PropertyDto, classProcessor: IClassProcessor<T>): any {
    const { value } = propertyDto;

    if (value === null) {
      return value;
    }

    const { type: classType, count = TypeValueHandler.DEFAULT_COUNT } = value as {
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
