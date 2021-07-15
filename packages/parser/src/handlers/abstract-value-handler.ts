import { Class, Faker } from '@mockinbird/types';
import { ClassProcessor } from '../lib/class-processor';

export class AbstractValueHandler {
  public constructor(protected readonly faker?: Faker, protected readonly classProcessor?: ClassProcessor<Class>) {}
}
