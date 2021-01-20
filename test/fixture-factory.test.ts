import { Fixture } from '../src/decorators/fixture.decorator';
import { FixtureFactory } from '../src/factories/fixture-factory';

enum Activity {
  VeryActive,
  Active,
  NotActive,
}

describe('Fixture Factory', () => {
  describe('With all kinds of properties', () => {
    class Dog {
      @Fixture((faker) => faker.name.firstName())
      readonly name: string;

      @Fixture((faker) => faker.random.number(14))
      readonly age: number;
    }

    class Book {
      @Fixture((faker) => faker.commerce.productName())
      readonly title: string;

      @Fixture({ type: Dog, count: 2 })
      readonly dogs: Dog[];

      @Fixture()
      readonly date: Date;

      @Fixture((faker) => faker.name.firstName())
      readonly author: string;
    }

    class Person {
      @Fixture((faker) => faker.internet.email())
      readonly email: string;

      @Fixture((faker) => faker.random.number(30))
      readonly age: number;

      @Fixture('Omer')
      readonly name: string;

      @Fixture({ type: Book, count: 4 })
      readonly books: Book[];

      @Fixture()
      readonly date: Date;

      @Fixture(Dog)
      readonly dog: Dog;

      @Fixture({ type: String, count: 3 })
      readonly strings: string[];

      @Fixture({ type: Number, count: 3 })
      readonly numbers: number[];

      @Fixture({ enum: Activity })
      readonly activeEnum: Activity;

      @Fixture()
      readonly emptyNumber: number;

      @Fixture()
      readonly emptyBoolean: boolean;

      @Fixture()
      readonly emptyString: string;

      readonly propertyWithoutDecorator: string;

      @Fixture()
      readonly propertyWithoutType;
    }

    let result;

    describe('When calling FixtureFactory.create', () => {
      result = FixtureFactory.create<Person>(Person);
    });
  });
});
