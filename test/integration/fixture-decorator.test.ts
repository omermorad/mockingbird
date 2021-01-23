import { TestClasses } from './common/test-classes';
import { FixtureFactory } from '../../src/factories/fixture-factory';

import TestClassWithAbsoluteValues = TestClasses.TestClassWithAbsoluteValues;
import TestClassWithNoValues = TestClasses.TestClassWithNoValues;
import TestClassWithCallback = TestClasses.TestClassWithCallback;
import TestClassWithEnum = TestClasses.TestClassWithEnum;
import TestClassWithOtherClass = TestClasses.TestClassWithSingleClass;
import TestClassWithMultiClass = TestClasses.TestClassWithMultiClass;

describe('Fixture Factory - Integration Test', () => {
  let result;

  describe('Given a decorated class', () => {
    describe('when using the related decorator with absolute values', () => {
      beforeAll(() => {
        result = FixtureFactory.create(TestClassWithAbsoluteValues);
      });

      test('then return the exact same values passed in the options', () => {
        expect(result).toMatchSnapshot({
          date: expect.any(Date),
        });
      });
    });

    describe('when using the related decorator with a callback (faker)', () => {
      beforeAll(() => {
        result = FixtureFactory.create(TestClassWithCallback);
      });

      test('then return random values from faker', () => {
        expect(result).toMatchObject({
          email: expect.any(String),
          name: expect.any(String),
        });
      });
    });

    describe('when using the related decorator with an enum value', () => {
      beforeAll(() => {
        result = FixtureFactory.create(TestClassWithEnum);
      });

      test('then return one random value (not key)', () => {
        expect(['foo', 111, 'Bazz1234']).toContain(result.someEnumVal);
      });
    });

    describe('when using the related decorator with no/empty values', () => {
      beforeAll(() => {
        result = FixtureFactory.create(TestClassWithNoValues);
      });

      test('then infer the value from the type itself', () => {
        expect(result).toMatchSnapshot({
          name: expect.any(String),
          num: expect.any(Number),
          binary: expect.any(Boolean),
          date: expect.any(Date),
        });
      });
    });

    describe('when using the related decorator with a single class', () => {
      beforeAll(() => {
        result = FixtureFactory.create(TestClassWithOtherClass);
      });

      test('then return an object with the given class', () => {
        expect(Object.keys(result.dog)).toEqual(['name', 'points']);
      });
    });

    describe('when using the related decorator with a multi class', () => {
      beforeAll(() => {
        result = FixtureFactory.create(TestClassWithMultiClass);
      });

      test("then return array with length 'count'", () => {
        expect(result.dogs).toBeInstanceOf(Array);
        expect(result.dogs).toHaveLength(3);
      });

      test('then return array of objects with the given class keys', () => {
        expect(result.dogs).toEqual(
          expect.arrayContaining([expect.objectContaining({ name: expect.any(String), points: expect.any(Number) })])
        );
      });
    });
  });
});
