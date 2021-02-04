import { IProperty } from '../types/iproperty.interface';
import { ExactValue, MockOptions } from '../types/mock-options.type';

import { AbstractValueHandler } from './abstract-value-handler';
import { isPrimitive } from '../common/is-primitive';

export abstract class PrimitiveHandlerAbstract<P extends MockOptions> extends AbstractValueHandler {
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

  public isPrimitive(propertyDto: IProperty<P>): boolean {
    return isPrimitive(propertyDto.constructorName) && !propertyDto.decoratorValue.isCallback();
  }
}
