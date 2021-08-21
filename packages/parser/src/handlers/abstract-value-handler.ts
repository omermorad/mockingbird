import { Faker } from '@mockinbird/common';

export class AbstractValueHandler {
  public constructor();
  public constructor(fakerMock: Faker);
  public constructor(protected readonly faker?: Faker) {}
}
