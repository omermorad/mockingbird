import { ValueHandler } from '../../types/value-handler.interface';
import { PropertyDto } from '../../types/property-dto.interface';

import FakerStatic = Faker.FakerStatic;

export class EnumValueHandler implements ValueHandler {
  public constructor(protected readonly faker: FakerStatic) {}

  private static getEnumValues(enumObj: object): any[] {
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
    return propertyDto.type === 'object' && EnumValueHandler.isEnumValue(propertyDto);
  }

  public static isEnumValue(propertyDto: PropertyDto): boolean {
    const { value = '' } = propertyDto;

    return Object.prototype.hasOwnProperty.call(value, 'enum');
  }

  public handle<T>(propertyDto: PropertyDto): any {
    const { value } = propertyDto;
    const { enum: enumObj } = value as { enum: object };

    return this.faker.random.arrayElement(EnumValueHandler.getEnumValues(enumObj));
  }

  public hasCircularClassFixture(): boolean {
    return false;
  }
}
