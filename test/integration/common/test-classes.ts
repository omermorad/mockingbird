import { Fixture } from '../../../src/decorators';

enum TestEnum {
  Foo = 'foo',
  Bar = 111,
  Bazz = 'Bazz1234',
}

export namespace TestClasses {
  export class TestClassWithAbsoluteValues {
    @Fixture('FooBar')
    name: string;

    @Fixture(1234)
    num: number;

    @Fixture(true)
    binary: boolean;

    @Fixture(new Date())
    date: Date;

    @Fixture({ thiss: 'is', an: 'object', literal: true })
    objectLiteral: object;
  }

  export class TestClassWithCallback {
    @Fixture((faker) => faker.internet.email())
    email: string;

    @Fixture((faker) => faker.name.firstName())
    name: string;
  }

  export class TestClassWithNoValues {
    @Fixture()
    name: string;

    @Fixture()
    num: number;

    @Fixture()
    binary: boolean;

    @Fixture()
    date: Date;
  }

  export class TestClassWithEnum {
    @Fixture({ enum: TestEnum })
    someEnumVal: string;
  }

  class Dog {
    @Fixture()
    name: string;

    @Fixture()
    points: number;
  }

  export class TestClassWithSingleClass {
    @Fixture(Dog)
    dog: Dog;
  }

  export class TestClassWithMultiClass {
    @Fixture({ type: Dog, count: 3 })
    dogs: Dog[];
  }
}
