import { ClassReflection } from '@plumier/reflect';
import { PropertyDto } from './property-dto.interface';
import { IClassProcessor } from '../types/iclass-processor.interface';

export interface ValueInspector {
  shouldInspect(propertyDto: PropertyDto): boolean;

  hasCircularClassFixture(parentClassReflection: ClassReflection, propertyDto: PropertyDto): boolean;

  deduceValue<T>(propertyDto: PropertyDto, classProcessor?: IClassProcessor<T>): T;
}
