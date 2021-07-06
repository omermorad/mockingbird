import { ValueHandler } from '../types/value-handler.interface';
import { Property } from '../property';
import { EnumObject } from '../types/mock-options.type';
import { AbstractValueHandler } from './abstract-value-handler';

export class EnumValueHandler<P extends EnumObject> extends AbstractValueHandler implements ValueHandler<P> {
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

  public shouldHandle(propertyDto: Property<P>): boolean {
    return propertyDto.decoratorValue.isEnum();
  }

  public produceValue<T>(propertyDto: Property<P>): any {
    const {
      decoratorValue: { value },
    } = propertyDto;
    const { enum: enumObj } = value as { enum: Record<string, unknown> };

    return this.faker.random.arrayElement(EnumValueHandler.getEnumValues(enumObj));
  }
}
