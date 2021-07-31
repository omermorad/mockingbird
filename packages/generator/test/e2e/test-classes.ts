import { Mock } from '../../src';

export namespace TestClassesE2E {
  export class Dog {
    @Mock('doggy dog')
    name: string;
  }
}
