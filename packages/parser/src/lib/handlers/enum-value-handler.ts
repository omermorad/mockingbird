import { Property } from '@mockingbird/reflect';
import { ValueHandler } from '../types/value-handler.interface';
import { Inject, Service } from 'typedi';
import { LazyEnum, Faker } from '@mockingbird/common';

@Service()
export class EnumValueHandler implements ValueHandler {
  public constructor(@Inject('Faker') private readonly faker: Faker) {}

  private static getEnumValues(enumObj: Record<string, unknown>): any[] {
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

  public shouldHandle(property: Property): boolean {
    return property.propertyValue.isEnum();
  }

  public produceValue(property: Property): any {
    const enumObj = property.propertyValue.decorator.value as LazyEnum;
    const actual = enumObj.enum();

    return EnumValueHandler.getEnumValues(actual).sort(() => 0.5 - Math.random())[0];
  }
}
