import { ValueHandler } from '../../types/value-handler.interface';
import { PropertyDto } from '../../types/property-dto.interface';

import FakerStatic = Faker.FakerStatic;

export class PrimitiveValueHandler implements ValueHandler {
  protected static readonly PRIMITIVES = ['String', 'Boolean', 'Number', 'Date'];

  public constructor(protected readonly faker?: FakerStatic) {}

  protected generateRandomValueFromPrimitive(ctor: string) {
    const { faker } = this;

    if (ctor === 'String') {
      return faker.random.alpha({ count: 10 });
    } else if (ctor === 'Number') {
      return faker.random.number(1000);
    } else if (ctor === 'Boolean') {
      return faker.random.boolean();
    } else if (ctor === 'Date') {
      return faker.date.recent();
    } else {
      return faker.random.alphaNumeric();
    }
  }

  public shouldHandle(propertyDto: PropertyDto): boolean {
    return PrimitiveValueHandler.PRIMITIVES.includes(propertyDto.constructorName) && propertyDto.type !== 'function';
  }

  public handle<T>(propertyDto: PropertyDto): any {
    if (propertyDto.value) {
      return propertyDto.value;
    }

    return this.generateRandomValueFromPrimitive(propertyDto.constructorName);
  }

  public hasCircularClassFixture(): boolean {
    return false;
  }
}
