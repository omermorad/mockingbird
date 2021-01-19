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

      @Fixture({ type: Book, count: 1 })
      readonly books: Book[];

      @Fixture()
      readonly date: Date;

      @Fixture(Dog)
      readonly dog: Dog;

      @Fixture({ type: Date, count: 3 })
      readonly id: number[];

      @Fixture({ type: String, count: 3 })
      readonly strings: string[];

      @Fixture({ enum: Activity })
      readonly active: Activity;

      @Fixture()
      readonly coins: number;

      @Fixture()
      readonly binary: boolean;

      @Fixture()
      readonly mahrozet: string;

      readonly propertyWithoutDecorator: string;

      @Fixture()
      readonly propertyWithoutType;
    }

    let result;
    describe('When calling FixtureFactory.create', () => {
      result = FixtureFactory.create<Person>(Person);
    });

    test('Then the result should contain an array with the total amount of elements', () => {
      expect(result).toHaveLength(9);
    });
  });
});
