import { ValueHandler } from '../../types/value-handler.interface';
import { PropertyDto } from '../../types/property-dto.interface';
import { ClassType } from '../../types';
import { FixturesCreator } from '../fixtures-creator';
import { ClassReflection } from '@plumier/reflect';

export class ObjectValueHandler implements ValueHandler {
  private static readonly DEFAULT_COUNT = 3;

  shouldHandle(propertyDto: PropertyDto): boolean {
    return propertyDto.type === 'object';
  }

  handle<T>(propertyDto: PropertyDto, handler: FixturesCreator<T>): any {
    const { value } = propertyDto;
    // null value
    if (value === null) {
      return value;
    }

    // { type: enum }
    if (Object.prototype.hasOwnProperty.call(value, 'enum')) {
      const { enum: enumObj } = value as { enum: object };

      return handler.faker.random.arrayElement(ObjectValueHandler.getEnumValues(enumObj));
    }

    // { type: Class, count: 5 }
    if (Object.prototype.hasOwnProperty.call(value, 'type')) {
      const { type: classType, count = ObjectValueHandler.DEFAULT_COUNT } = value as {
        type: ClassType;
        count?: number;
      };

      const instances = new Array<any>(count);

      for (let index = 0; index < count; index++) {
        instances[index] = handler.createForTarget(classType);
      }

      return instances;
    }
  }

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

  detectCircularClassFixture(parentClassReflection: ClassReflection, propertyDto: PropertyDto): boolean {
    if (!Object.prototype.hasOwnProperty.call(propertyDto.value, 'type')) {
      return false;
    }

    const { type } = propertyDto.value as {
      type: ClassType;
    };

    return parentClassReflection.type === type;
  }
}
