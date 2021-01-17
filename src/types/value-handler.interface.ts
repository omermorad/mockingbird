import { ClassReflection } from '@plumier/reflect';
import { PropertyDto } from './property-dto.interface';
import { IClassProcessor } from '../types/iclass-processor.interface';

import FakerStatic = Faker.FakerStatic;

export interface ValueHandler {
  shouldHandle(propertyDto: PropertyDto): boolean;

  detectCircularClassFixture(parentClassReflection: ClassReflection, propertyDto: PropertyDto): boolean;

  handle<T>(propertyDto: PropertyDto, classProcessor: IClassProcessor<T>, faker: FakerStatic): any | any[];
}
