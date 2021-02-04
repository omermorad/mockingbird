import { ValueHandler } from '../types/value-handler.interface';
import { IProperty } from '../types/iproperty.interface';
import { EnumObject } from '../types/mock-options.type';
import { AbstractValueHandler } from './abstract-value-handler';

export class EnumValueHandler<P extends EnumObject> extends AbstractValueHandler implements ValueHandler<P> {
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

  public shouldHandle(propertyDto: IProperty<P>): boolean {
    return propertyDto.decoratorValue.isEnum();
  }

  public produceValue<T>(propertyDto: IProperty<P>): any {
    const {
      decoratorValue: { value },
    } = propertyDto;
    const { enum: enumObj } = value as { enum: object };

    return this.faker.random.arrayElement(EnumValueHandler.getEnumValues(enumObj));
  }
}
