import { Mock } from '../../src';

export namespace TestClassesE2E {
  enum Gender {
    male = 'male',
  }

  export class Car {
    @Mock('BMW')
    model: string;
  }

  export class Person {
    @Mock({ enum: Gender })
    gender: Gender;

    @Mock(Car)
    car: Car;
  }

  export class Dog {
    @Mock('doggy dog')
    name: string;

    @Mock(Person)
    owner: Person;
  }
}
