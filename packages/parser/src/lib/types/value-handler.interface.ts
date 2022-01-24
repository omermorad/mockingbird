import { Property } from '@mockingbird/reflect';

export interface ValueHandler {
  shouldHandle(property: Property): boolean;
  produceValue<T>(property: Property, config?: Record<string, any>): T | T[];
}
