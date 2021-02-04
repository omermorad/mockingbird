import { PrimitiveHandlerAbstract } from './primitive-handler-abstract';
import { ValueHandler } from '../types/value-handler.interface';
import { IProperty } from '../types/iproperty.interface';
import { ExactValue } from '../types/mock-options.type';

export class PrimitiveValueHandler<P extends ExactValue>
  extends PrimitiveHandlerAbstract<P>
  implements ValueHandler<P> {
  public shouldHandle(property: IProperty<P>): boolean {
    return this.isPrimitive(property);
  }

  public produceValue<T>(property: IProperty<P>): any {
    const { decoratorValue } = property;

    if (typeof decoratorValue.value !== 'undefined') {
      if (decoratorValue.isMultiClass()) {
        throw new Error(
          'Type mismatch. Properties decorated with @Mock({ type: ClassType }) must be typed as array (e.g. prop: string[])'
        );
      }

      return decoratorValue.value;
    }

    return super.generateRandomValueFromPrimitive(property.constructorName);
  }
}
