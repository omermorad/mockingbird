import { Class } from '../types/mock-options.type';
import { ClassProcessor } from '../lib/class-processor';

import FakerStatic = Faker.FakerStatic;

export class AbstractValueHandler {
  public constructor(
    protected readonly faker?: FakerStatic,
    protected readonly classProcessor?: ClassProcessor<Class>
  ) {}
}
