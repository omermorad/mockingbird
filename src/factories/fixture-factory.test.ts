import { Fixture } from '../decorators';
import { FixtureFactory } from './fixture-factory';

enum Activity {
  VeryActive,
  Active,
  NotActive,
}

describe('Fixture Factory', () => {
  describe('With all kinds of properties', () => {
    const mockStr = 'TestStr';

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

      @Fixture(mockStr)
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

    it('Should return single item if no limit was passed', () => {
      const result = FixtureFactory.create<Person>(Person);
      const expected = { name: mockStr };

      expect(result).toMatchObject(expected);
    });

    it('Should return single item if total: 1 was passed', () => {
      const result = FixtureFactory.create<Person>(Person, { count: 1 });
      const expected = { name: mockStr };

      expect(result).toMatchObject(expected);
    });

    it('Should return array of items of total > 1', () => {
      const result = FixtureFactory.create<Person>(Person, { count: 3 });

      expect(result).toHaveLength(3);
    });
  });
});
