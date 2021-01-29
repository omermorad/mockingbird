import { Class } from '../types/fixture-options.type';
import { ClassProcessor } from '../class-processor';

import FakerStatic = Faker.FakerStatic;

export class AbstractValueHandler {
  public constructor(
    protected readonly faker?: FakerStatic,
    protected readonly classProcessor?: ClassProcessor<Class>
  ) {}
}
