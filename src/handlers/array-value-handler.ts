import { ValueHandler } from '../types/value-handler.interface';
import { PropertyInterface } from '../types/property.interface';
import { ExactValue, Class } from '../types/fixture-options.type';
import { MultiClass } from '../types/fixture-options.type';
import { PrimitiveHandlerAbstract } from './primitive-handler-abstract';
import { Property } from '../property';
import { isPrimitive } from '../utils/isPrimitive';

// TODO: refactor (2nd phase). All other fixture options should be wrapped with 'multiple' functionality
export class ArrayValueHandler<P extends MultiClass> extends PrimitiveHandlerAbstract<P> implements ValueHandler<P> {
  public shouldHandle(property: PropertyInterface<P>): boolean {
    return property.decoratorValue.isMultiClass();
  }

  public produceValue<T>(property: Property<P>): any {
    const { decoratorValue } = property;

    if (decoratorValue.value === null) {
      return null;
    }

    const { count, type } = decoratorValue.value as MultiClass;

    if (isPrimitive(type.name)) {
      const instances = new Array<ExactValue>(count);

      for (let index = 0; index < count; index++) {
        instances[index] = super.generateRandomValueFromPrimitive(type.name);
      }

      return instances;
    }

    const instances = new Array(count);

    for (let index = 0; index < count; index++) {
      instances[index] = this.classProcessor.process(type as Class);
    }

    return instances;
  }
}
