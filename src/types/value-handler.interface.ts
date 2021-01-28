import { PropertyDto } from './property-dto.interface';
import { IClassProcessor } from '../types/iclass-processor.interface';
import { FixtureOptions } from '../types/fixture-options.type';

export interface ValueHandler<P extends FixtureOptions> {
  shouldHandle(propertyDto: PropertyDto<P>): boolean;

  produceValue<T>(propertyDto: PropertyDto<P>, classProcessor?: IClassProcessor<T>): T | T[];
}
