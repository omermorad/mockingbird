import { Faker } from '@mockinbird/types';
import { ClassParser } from '../lib/class-parser';

export class AbstractValueHandler {
  public constructor(protected readonly faker?: Faker, protected readonly classParser?: ClassParser) {}
}
