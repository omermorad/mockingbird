import { Container, Service } from 'typedi';
import { LazyType } from '@mockingbird/common';
import { Property } from '@mockingbird/reflect';
import { ValueHandler } from '../types/value-handler.interface';
import { ClassParser } from '../parser/class-parser';

@Service()
export class ClassCallbackHandler implements ValueHandler {
  public shouldHandle(property: Property): boolean {
    return property.propertyValue.isClassCb();
  }

  public produceValue<TClass>(property: Property, config: { reference: string }): TClass | null {
    const parser = Container.get<ClassParser>(ClassParser);

    return parser.parse((property.propertyValue.decorator.value as LazyType<TClass>)(), {
      reference: config.reference,
    });
  }
}
