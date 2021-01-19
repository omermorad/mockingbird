import FakerStatic = Faker.FakerStatic;
import { PropertyDto } from '../types/property-dto.interface';
import { ExactValue } from '../types/exact-value.type';

export abstract class PrimitiveHandlerAbstract {
  protected static readonly PRIMITIVES = ['String', 'Boolean', 'Number', 'Date'];

  protected constructor(protected readonly faker: FakerStatic) {}

  protected generateRandomValueFromPrimitive(ctor: string): ExactValue {
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

  public isPrimitive(propertyDto: PropertyDto): boolean {
    return PrimitiveHandlerAbstract.PRIMITIVES.includes(propertyDto.constructorName) && propertyDto.type !== 'function';
  }
}
