import { ParserConfig } from './types';

export interface MockGeneratorOptions<TClass = any> extends ParserConfig<TClass> {
  count?: number;
  plain?: boolean;
}
