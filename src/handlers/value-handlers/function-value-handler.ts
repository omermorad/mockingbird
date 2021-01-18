import { ClassReflection } from '@plumier/reflect';
import { IClassProcessor } from '../../types/iclass-processor.interface';
import { ValueHandler } from '../../types/value-handler.interface';
import { PropertyDto } from '../../types/property-dto.interface';
import { ClassType } from '../../types';

import FakerStatic = Faker.FakerStatic;

export class FunctionValueHandler implements ValueHandler {
  protected static readonly PRIMITIVES = ['String', 'Boolean', 'Number', 'Date'];

  public constructor(protected readonly faker: FakerStatic) {}

  public shouldHandle(propertyDto: PropertyDto): boolean {
    return propertyDto.type === 'function';
  }

  public handle<T>(propertyDto: PropertyDto, classProcessor: IClassProcessor<T>): any {
    if (!this.isConstructorNameAPrimitive(propertyDto)) {
      // ClassType
      return classProcessor.process(propertyDto.value as ClassType);
    }

    // Callback
    return (propertyDto.value as Function)(this.faker);
  }

  public isConstructorNameAPrimitive(propertyDto: PropertyDto): boolean {
    return FunctionValueHandler.PRIMITIVES.includes(propertyDto.constructorName);
  }

  public hasCircularClassFixture(parentClassReflection: ClassReflection, propertyDto: PropertyDto): boolean {
    return !this.isConstructorNameAPrimitive(propertyDto) && parentClassReflection.type === propertyDto.value;
  }
}
