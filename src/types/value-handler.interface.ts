import { PropertyDto } from './property-dto.interface';
import { IClassProcessor } from '../types/iclass-processor.interface';
import { MockOptions } from '../types/mock-options.type';

export interface ValueHandler<P extends MockOptions> {
  shouldHandle(propertyDto: PropertyDto<P>): boolean;

  produceValue<T>(propertyDto: PropertyDto<P>, classProcessor?: IClassProcessor<T>): T | T[];
}
