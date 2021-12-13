import RandExp from 'randexp';
import { Inject, Service } from 'typedi';
import { Property } from '@mockingbird/reflect';
import { ValueHandler } from '../types/value-handler.interface';
import { Class } from '@mockingbird/common';

@Service()
export class RegexValueHandler implements ValueHandler {
  public constructor(@Inject('RandExp') private readonly randexp: Class<RandExp>) {}

  public shouldHandle(property: Property): boolean {
    return property.propertyValue.isRegex();
  }

  public produceValue(property: Property): any {
    const { propertyValue } = property;
    const { value: regex } = propertyValue.decorator;

    const randexp = new this.randexp(regex as RegExp);
    return randexp.gen() as string;
  }
}
