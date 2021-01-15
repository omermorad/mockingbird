import { ValueHandler } from '../../types/value-handler.interface';
import { PropertyDto } from '../../types/property-dto.interface';
import { ClassType } from '../../types';
import { FixturesCreator } from '../fixtures-creator';
import { ClassReflection } from '@plumier/reflect';

export class FunctionValueHandler implements ValueHandler {
  protected static readonly PRIMITIVES = ['String', 'Boolean', 'Number', 'Date'];

  shouldHandle(propertyDto: PropertyDto): boolean {
    return propertyDto.type === 'function';
  }

  handle<T>(propertyDto: PropertyDto, handler: FixturesCreator<T>): any {
    if (!this.isConstructorNameAPrimitive(propertyDto)) {
      // ClassType
      // TODO - protect against infinite loop
      return handler.createForTarget(propertyDto.value as ClassType);
    }

    // Callback
    return (propertyDto.value as Function)(handler.faker);
  }

  isConstructorNameAPrimitive(propertyDto: PropertyDto): boolean {
    return FunctionValueHandler.PRIMITIVES.includes(propertyDto.constructorName);
  }

  detectCircularClassFixture(parentClassReflection: ClassReflection, propertyDto: PropertyDto): boolean {
    return !this.isConstructorNameAPrimitive(propertyDto) && parentClassReflection.type === propertyDto.value;
  }
}
