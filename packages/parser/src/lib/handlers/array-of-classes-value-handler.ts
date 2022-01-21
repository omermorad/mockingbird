import { Container, Service } from 'typedi';
import { isPrimitive, LazyType } from '@mockingbird/common';
import { Property } from '@mockingbird/reflect';
import { AbsoluteValue } from '@mockingbird/common';
import { PrimitiveHandler } from './primitive-handler';
import { ValueHandler } from '../types/value-handler.interface';
import { ClassParser } from '../parser/class-parser';

@Service()
export class ArrayOfClassesValueHandler implements ValueHandler {
  public constructor(private readonly primitiveHandler: PrimitiveHandler) {}

  public shouldHandle(property: Property): boolean {
    return property.propertyValue.isArrayOfClasses();
  }

  public produceValue<TClass = any>(property: Property): any[] {
    const { propertyValue } = property;

    if (propertyValue.decorator.value === null) {
      return null;
    }

    const type = (propertyValue.decorator.value as LazyType)();
    const { count } = propertyValue.decorator.options;

    if (isPrimitive(type.name)) {
      const instances = new Array<AbsoluteValue>(count);

      for (let index = 0; index < count; index++) {
        instances[index] = this.primitiveHandler.generateRandomValueFromPrimitive(type.name);
      }

      return instances;
    }

    const instances = new Array<TClass>(count);
    const parser = Container.get<ClassParser>(ClassParser);

    for (let index = 0; index < count; index++) {
      instances[index] = parser.parse(type);
    }

    return instances;
  }
}
