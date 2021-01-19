import { ClassReflection } from '@plumier/reflect';
import { IClassProcessor } from '../types/iclass-processor.interface';
import { ValueInspector } from '../types/value-inspector.interface';
import { PropertyDto } from '../types/property-dto.interface';
import { ClassType } from '../types/class.type';
import { Circular } from '../types/circular.interface';

import FakerStatic = Faker.FakerStatic;

export class FunctionValueInspector implements ValueInspector, Circular {
  protected static readonly PRIMITIVES = ['String', 'Boolean', 'Number', 'Date'];

  public constructor(protected readonly faker: FakerStatic) {}

  public shouldInspect(propertyDto: PropertyDto): boolean {
    return propertyDto.type === 'function';
  }

  public deduceValue<T>(propertyDto: PropertyDto, classProcessor: IClassProcessor<T>): any {
    if (!this.isConstructorNamePrimitive(propertyDto)) {
      // ClassType
      return classProcessor.process(propertyDto.value as ClassType);
    }

    // Callback
    return (propertyDto.value as Function)(this.faker);
  }

  public isConstructorNamePrimitive(propertyDto: PropertyDto): boolean {
    return FunctionValueInspector.PRIMITIVES.includes(propertyDto.constructorName);
  }

  public hasCircularClassFixture(parentClassReflection: ClassReflection, propertyDto: PropertyDto): boolean {
    return !this.isConstructorNamePrimitive(propertyDto) && parentClassReflection.type === propertyDto.value;
  }
}
