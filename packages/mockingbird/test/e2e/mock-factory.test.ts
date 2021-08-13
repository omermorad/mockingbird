import { MockFactory } from '../../src';
import { TestClassesE2E } from './test-classes';
import Dog = TestClassesE2E.Dog;

describe('MockFactory e2e Test', () => {
  let result: Dog[];

  when("calling 'many' method with a given class", () => {
    beforeAll(() => {
      result = MockFactory<Dog>(Dog).many(3);
    });

    then('return an array with the exact same length', () => {
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(3);
    });

    then('return 3 instances of the given class', () => {
      expect(result).toMatchSnapshot();
    });
  });

  describe('using a plain object', () => {
    when('I create 3 dogs and covert them into a plain object', () => {
      beforeAll(() => (result = MockFactory(Dog).plain().many(3)));

      test('then return a nested plain object', () => {
        expect(result).toMatchSnapshot();
      });
    });
  });
});
