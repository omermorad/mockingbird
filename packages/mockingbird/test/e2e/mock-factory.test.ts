import { MockFactory } from '../../src';
import { TestClassesE2E } from './test-classes';
import * as faker from 'faker';
import Bird = TestClassesE2E.Bird;

describe('MockFactory e2e Test', () => {
  let result;

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
    when('I create 3 dogs and covert them into a plain object', () => {
      beforeAll(() => (result = MockFactory(Bird).plain().many(3)));

      test('then return a nested plain object', () => {
        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('using mutations', () => {
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
});
