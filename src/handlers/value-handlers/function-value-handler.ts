import { ValueHandler } from '../../types/value-handler.interface';
import { PropertyDto } from '../../types/property-dto.interface';
import { ClassType } from '../../types';
import { ClassReflection } from '@plumier/reflect';
import { ClassProcessorInterface } from '../../types/class-processor.interface';
import FakerStatic = Faker.FakerStatic;

export class FunctionValueHandler implements ValueHandler {
  protected static readonly PRIMITIVES = ['String', 'Boolean', 'Number', 'Date'];

  shouldHandle(propertyDto: PropertyDto): boolean {
    return propertyDto.type === 'function';
  }

  handle<T>(propertyDto: PropertyDto, classProcessor: ClassProcessorInterface<T>, faker: FakerStatic): any {
    if (!this.isConstructorNameAPrimitive(propertyDto)) {
      // ClassType
      return classProcessor.process(propertyDto.value as ClassType);
    }

    // Callback
    return (propertyDto.value as Function)(faker);
  }

  isConstructorNameAPrimitive(propertyDto: PropertyDto): boolean {
    return FunctionValueHandler.PRIMITIVES.includes(propertyDto.constructorName);
  }

  detectCircularClassFixture(parentClassReflection: ClassReflection, propertyDto: PropertyDto): boolean {
    return !this.isConstructorNameAPrimitive(propertyDto) && parentClassReflection.type === propertyDto.value;
  }
}
