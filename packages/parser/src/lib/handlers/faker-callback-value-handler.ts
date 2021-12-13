import { Inject, Service } from 'typedi';
import { Property } from '@mockingbird/reflect';
import { FakerCallback, Faker } from '@mockingbird/common';
import { ValueHandler } from '../types/value-handler.interface';

@Service()
export class FakerCallbackValueHandler implements ValueHandler {
  public constructor(@Inject('Faker') private readonly faker: Faker) {}

  public shouldHandle(property: Property): boolean {
    const { propertyValue } = property;

    if (!propertyValue.isFunction()) {
      return false;
    }

    const cb = propertyValue.decorator.value as (...args: any[]) => any;
    let result;

    try {
      result = cb();

      if (property.constructorName === result?.constructor.name) {
        return false;
      }
    } catch (error) {
      return true;
    }
  }

  public produceValue(property: Property): any {
    return (property.propertyValue.decorator.value as FakerCallback)(this.faker);
  }
}
