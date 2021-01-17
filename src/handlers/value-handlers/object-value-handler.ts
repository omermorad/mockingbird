import { ClassReflection } from '@plumier/reflect';
import { ValueHandler } from '../../types/value-handler.interface';
import { PropertyDto } from '../../types/property-dto.interface';
import { ClassType } from '../../types';
import { IClassProcessor } from '../../types/iclass-processor.interface';
import FakerStatic = Faker.FakerStatic;

export class ObjectValueHandler implements ValueHandler {
  private static readonly DEFAULT_COUNT = 3;

  private static getEnumValues(enumObj: any): any[] {
    const keysList = Object.getOwnPropertyNames(enumObj).filter(
      (key) => enumObj.propertyIsEnumerable(key) && key !== String(parseFloat(key))
    );

    const length = keysList.length;
    const valuesList = new Array<any>(length);

    for (let index = 0; index < length; ++index) {
      const key = keysList[index];
      valuesList[index] = enumObj[key];
    }

    return valuesList;
  }

  public shouldHandle(propertyDto: PropertyDto): boolean {
    return propertyDto.type === 'object';
  }

  // TODO - break to multiple value handlers
  public handle<T>(propertyDto: PropertyDto, classProcessor: IClassProcessor<T>, faker: FakerStatic): any {
    const { value } = propertyDto;
    // null value
    if (value === null) {
      return value;
    }

    // { type: enum }
    if (Object.prototype.hasOwnProperty.call(value, 'enum')) {
      const { enum: enumObj } = value as { enum: object };

      return faker.random.arrayElement(ObjectValueHandler.getEnumValues(enumObj));
    }

    // { type: Class, count: 5 }
    if (Object.prototype.hasOwnProperty.call(value, 'type')) {
      const { type: classType, count = ObjectValueHandler.DEFAULT_COUNT } = value as {
        type: ClassType;
        count?: number;
      };

      const instances = new Array<any>(count);

      for (let index = 0; index < count; index++) {
        instances[index] = classProcessor.process(classType);
      }

      return instances;
    }
  }

  public hasCircularClassFixture(parentClassReflection: ClassReflection, propertyDto: PropertyDto): boolean {
    if (!Object.prototype.hasOwnProperty.call(propertyDto.value, 'type')) {
      return false;
    }

    const { type } = propertyDto.value as {
      type: ClassType;
    };

    return parentClassReflection.type === type;
  }
}
