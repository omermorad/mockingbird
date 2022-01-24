import * as faker from 'faker';
import { TestClassesE2E } from './test-classes';
import { MockFactory } from '../../src';

import Bird = TestClassesE2E.Bird;
import AnotherBird = TestClassesE2E.AnotherBird;

describe('MockFactory e2e Test', () => {
  let result;

  beforeAll(() => {
    // Mock the date so we don't have to get trouble in our snapshots (2000-01-01T00:00:00.000Z)
    jest.spyOn(faker.date, 'recent').mockReturnValue(new Date(Date.UTC(2000, 0, 0, 24)));
  });

  when("calling 'many' method with a given class", () => {
    beforeAll(() => {
      result = MockFactory<Bird>(Bird).many(3);
    });

    then('return an array with the exact same length', () => {
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(3);
    });

    then('return 3 instances of the given class', () => {
      expect(result).toMatchSnapshot();
    });
  });

  scenario('using a plain object', () => {
    when('I create 3 birds and covert them into a plain object', () => {
      beforeAll(() => (result = MockFactory(Bird).plain().many(3)));

      test('then return a nested plain object', () => {
        expect(result).toMatchSnapshot();
      });
    });
  });

  scenario('using mutations', () => {
    let mock;

    when('I use mutation with the mock factory', () => {
      beforeAll(() => {
        mock = MockFactory(Bird).mutate({ name: 'Mutated Name' }).one();
      });

      test("return a mock where the name is 'Mutated Name'", () => {
        expect(mock).toMatchSnapshot();
        expect(mock.name).toBe('Mutated Name');
      });
    });

    when('I use mutations (using faker) with the mock factory', () => {
      let mock;

      beforeAll(() => {
        faker.name.firstName = () => 'FakedBirdName';
        mock = MockFactory(Bird)
          .mutate((faker) => ({ name: faker.name.firstName() }))
          .one();
      });

      test("return a mock where the name is 'FakedBirdName'", () => {
        expect(mock.name).toBe('FakedBirdName');
      });
    });
  });

  scenario('using pick', () => {
    let mock;

    when('I use pick with MockBuilder', () => {
      beforeAll(() => {
        mock = MockFactory(Bird).pick('name').one();
      });

      then('return an instance of the class Bird', () => {
        expect(mock).toBeInstanceOf(Bird);
      });

      test('and contain only the property name', () => {
        expect(mock.name).toBeDefined();
        expect(mock.owner).toBeUndefined();
        expect(mock.birthday).toBeUndefined();
      });

      then('match the given result object (snapshot)', () => {
        expect(mock).toMatchSnapshot();
      });
    });
  });

  scenario('circular mocks', () => {
    let mock;

    when('when I create a factory with circular refernse', () => {
      beforeAll(() => {
        mock = MockFactory(AnotherBird).one();
      });

      then('do have something', () => {
        expect(mock).toMatchSnapshot();
      });
    });
  });
});
