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

  public produceValue<TClass>(property: Property): TClass {
    const analyzer = Container.get<ClassParser>(ClassParser);

    return analyzer.parse((property.propertyValue.decorator.value as LazyType<TClass>)());
  }
}
