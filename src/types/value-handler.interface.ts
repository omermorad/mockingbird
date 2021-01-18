import { ClassReflection } from '@plumier/reflect';
import { PropertyDto } from './property-dto.interface';
import { IClassProcessor } from '../types/iclass-processor.interface';

export interface ValueHandler {
  shouldHandle(propertyDto: PropertyDto): boolean;

  hasCircularClassFixture(parentClassReflection: ClassReflection, propertyDto: PropertyDto): boolean;

  handle<T>(propertyDto: PropertyDto, classProcessor?: IClassProcessor<T>): T;
}
