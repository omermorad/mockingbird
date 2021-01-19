import { ClassReflection } from '@plumier/reflect';
import { PropertyDto } from './property-dto.interface';

export interface Circular {
  hasCircularClassFixture(parentClassReflection: ClassReflection, propertyDto: PropertyDto): boolean;
}
