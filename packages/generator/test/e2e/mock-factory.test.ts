import { MockFactory } from '../../src';
import { TestClassesE2E } from './test-classes';
import Dog = TestClassesE2E.Dog;

describe('MockFactory e2e Test', () => {
  describe("when calling 'many' method with a given class", () => {
    let result: Dog[];

    beforeAll(() => {
      result = MockFactory<Dog>(Dog).many(3);
    });

    test('then return an array with the exact same length', () => {
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(3);
    });

    test('then return 3 instances of the given class', () => {
      expect(result).toMatchSnapshot();
    });
  });
});
