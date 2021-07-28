import { MockFactory } from '../../src';
import { TestClassesE2E } from './test-classes';
import Dog = TestClassesE2E.Dog;

describe('MockFactory e2e Test', () => {
  when("calling 'many' method with a given class", () => {
    let result: Dog[];

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
});
