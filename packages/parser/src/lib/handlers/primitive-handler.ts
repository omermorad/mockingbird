import { Inject, Service } from 'typedi';
import { Property } from '@mockingbird/reflect';
import { AbsoluteValue, Faker, isPrimitive } from '@mockingbird/common';

@Service()
export class PrimitiveHandler {
  public constructor(@Inject('Faker') public readonly faker: Faker) {}

  generateRandomValueFromPrimitive(ctor: string): boolean | number | string | Date {
    const { faker } = this;

    if (ctor === 'String') {
      return faker.random.alpha({ count: 10 });
    } else if (ctor === 'Number') {
      return faker.datatype.number(1000);
    } else if (ctor === 'Boolean') {
      return faker.datatype.boolean();
    } else if (ctor === 'Date') {
      return faker.date.recent();
    } else {
      return faker.random.alphaNumeric();
    }
  }

  public isPrimitive(propertyDto: Property): boolean {
    return isPrimitive(propertyDto.constructorName) && !propertyDto.propertyValue.isFunction();
  }
}
