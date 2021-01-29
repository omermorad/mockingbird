import { PrimitiveHandlerAbstract } from './primitive-handler-abstract';
import { ValueHandler } from '../types/value-handler.interface';
import { PropertyInterface } from '../types/property.interface';
import { ExactValue } from '../types/fixture-options.type';

export class PrimitiveValueHandler<P extends ExactValue>
  extends PrimitiveHandlerAbstract<P>
  implements ValueHandler<P> {
  public shouldHandle(property: PropertyInterface<P>): boolean {
    return this.isPrimitive(property);
  }

  public produceValue<T>(property: PropertyInterface<P>): any {
    const { decoratorValue } = property;

    if (typeof decoratorValue.value !== 'undefined') {
      if (decoratorValue.isMultiClass()) {
        throw new Error(
          'Type mismatch. Properties decorated with @Fixture({ type: ClassType }) must be typed as array (e.g. prop: string[])'
        );
      }

      return decoratorValue.value;
    }

    return super.generateRandomValueFromPrimitive(property.constructorName);
  }
}
