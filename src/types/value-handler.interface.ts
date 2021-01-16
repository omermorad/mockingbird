import { PropertyDto } from './property-dto.interface';
import { ClassReflection } from '@plumier/reflect';
import { ClassProcessorInterface } from './class-processor.interface';
import FakerStatic = Faker.FakerStatic;

export interface ValueHandler {
  shouldHandle(propertyDto: PropertyDto): boolean;
  detectCircularClassFixture(parentClassReflection: ClassReflection, propertyDto: PropertyDto): boolean;
  handle<T>(propertyDto: PropertyDto, classProcessor: ClassProcessorInterface<T>, faker: FakerStatic): any | any[];
}
