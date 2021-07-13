import { TestClasses } from './common/test-classes';
import { MockGenerator } from '../../src';
import TestClassWithAbsoluteValues = TestClasses.TestClassWithAbsoluteValues;
import TestClassWithNoValues = TestClasses.TestClassWithNoValues;
import TestClassWithCallback = TestClasses.TestClassWithCallback;
import TestClassWithEnum = TestClasses.TestClassWithEnum;
import TestClassWithOtherClass = TestClasses.TestClassWithSingleClass;
import TestClassWithMultiClass = TestClasses.TestClassWithMultiClass;

describe('MockFactory - Integration Test', () => {
  let result;

  describe('given a decorated class', () => {
    describe('when using the @Mock decorator with absolute values', () => {
      beforeAll(() => {
        result = MockGenerator.create(TestClassWithAbsoluteValues);
      });

      test('then return the exact same values passed in the options', () => {
        expect(result).toMatchSnapshot({
          date: expect.any(Date),
        });
      });
    });

    describe('when using the @Mock decorator with a callback (faker)', () => {
      beforeAll(() => {
        result = MockGenerator.create(TestClassWithCallback);
      });

      test('then return random values from faker', () => {
        expect(result).toMatchObject({
          email: expect.any(String),
          name: expect.any(String),
        });
      });
    });

    describe('when using the @Mock decorator with an enum decoratorValue', () => {
      beforeAll(() => {
        result = MockGenerator.create(TestClassWithEnum);
      });

      test('then return one random decoratorValue (not key)', () => {
        expect(['foo', 111, 'Bazz1234']).toContain(result.someEnumVal);
      });
    });

    describe('when using the @Mock decorator with no/empty values', () => {
      beforeAll(() => {
        result = MockGenerator.create(TestClassWithNoValues);
      });

      test('then infer the decoratorValue from the type itself', () => {
        expect(result).toMatchSnapshot({
          name: expect.any(String),
          num: expect.any(Number),
          binary: expect.any(Boolean),
          date: expect.any(Date),
        });
      });
    });

    describe('when using the @Mock decorator with a single class', () => {
      beforeAll(() => {
        result = MockGenerator.create(TestClassWithOtherClass);
      });

      test('then return an object with the given class', () => {
        expect(Object.keys(result.dog)).toEqual(['name', 'points']);
      });
    });

    describe('when using the @Mock decorator with a multi class', () => {
      beforeAll(() => {
        result = MockGenerator.create(TestClassWithMultiClass);
      });

      test("then return contain a property 'dogs' which is array of Dog with length of 'count'", () => {
        expect(result.dogs).toBeInstanceOf(Array);
        expect(result.dogs).toHaveLength(3);
      });

      test('then return array of objects with the given class keys', () => {
        expect(result.dogs).toEqual(
          expect.arrayContaining([expect.objectContaining({ name: expect.any(String), points: expect.any(Number) })])
        );
      });
    });

    describe("when using the @Mock decorator with 'count' option", () => {
      beforeAll(() => {
        result = MockGenerator.create(TestClassWithAbsoluteValues, { count: 4, locale: 'ja' });
      });

      test("then return array with length of 'count'", () => {
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveLength(4);
      });
    });
  });
});
