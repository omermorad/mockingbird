import { ValueHandler } from '../../types/value-handler.interface';
import { PropertyDto } from '../../types/property-dto.interface';
import { FixturesCreator } from '../fixtures-creator';
import FakerStatic = Faker.FakerStatic;

export class PrimitiveValueHandler implements ValueHandler {
  protected static readonly PRIMITIVES = ['String', 'Boolean', 'Number', 'Date'];

  shouldHandle(propertyDto: PropertyDto): boolean {
    return PrimitiveValueHandler.PRIMITIVES.includes(propertyDto.constructorName) && propertyDto.type !== 'function';
  }

  handle<T>(propertyDto: PropertyDto, handler: FixturesCreator<T>): any {
    if (propertyDto.value) {
      return propertyDto.value;
    }

    // Flowing random primitive value
    return this.generateRandomValueFromPrimitive(propertyDto.constructorName, handler.faker);
  }

  protected generateRandomValueFromPrimitive(ctor: string, faker: FakerStatic) {
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

  detectCircularClassFixture(): boolean {
    return false;
  }
}
