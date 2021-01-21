import { PropertyDto } from './property-dto.interface';
import { IClassProcessor } from '../types/iclass-processor.interface';

export interface ValueHandler {
  shouldHandle(propertyDto: PropertyDto): boolean;

  produceValue<T>(propertyDto: PropertyDto, classProcessor?: IClassProcessor<T>): T | T[];
}
