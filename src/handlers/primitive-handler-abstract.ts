import { PropertyDto } from '../types/property-dto.interface';
import { ExactValue, MockOptions } from '../types/mock-options.type';

import FakerStatic = Faker.FakerStatic;

export abstract class PrimitiveHandlerAbstract<P extends MockOptions> {
  public static readonly PRIMITIVES = ['String', 'Boolean', 'Number', 'Date'];

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

  public isConstructorNamePrimitive(propertyDto: PropertyDto<P>) {
    return PrimitiveHandlerAbstract.PRIMITIVES.includes(propertyDto.constructorName);
  }

  public isPrimitive(propertyDto: PropertyDto<P>): boolean {
    return this.isConstructorNamePrimitive(propertyDto) && propertyDto.type !== 'function';
  }
}
