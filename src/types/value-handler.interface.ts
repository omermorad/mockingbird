import { PropertyDto } from './property-dto.interface';
import { FixturesCreator } from '../handlers/fixtures-creator';
import { ClassReflection } from '@plumier/reflect';

export interface ValueHandler {
  shouldHandle(propertyDto: PropertyDto): boolean;
  detectCircularClassFixture(parentClassReflection: ClassReflection, propertyDto: PropertyDto): boolean;
  handle<T>(propertyDto: PropertyDto, creator: FixturesCreator<T>): any | any[];
}
