import { ClassParser } from '@mockinbird/parser';
import { ClassReflector } from '@mockinbird/reflect';
import { Faker } from '../../src';
import { TestClasses } from './common/test-classes';
import { MockGenerator } from '../../src/lib/mock-generator';

import TestClassWithAbsoluteValues = TestClasses.TestClassWithAbsoluteValues;
import TestClassWithNoValues = TestClasses.TestClassWithNoValues;
import TestClassWithCallback = TestClasses.TestClassWithCallback;
import TestClassWithEnum = TestClasses.TestClassWithEnum;
import TestClassWithOtherClass = TestClasses.TestClassWithSingleClass;
import TestClassWithMultiClass = TestClasses.TestClassWithMultiClass;

describe('MockGenerator - Integration Test', () => {
  let result;

  const reflector = new ClassReflector();
  const parser = new ClassParser(Faker, reflector);
  const generator = new MockGenerator(parser);

  describe('given a decorated class', () => {
    describe('when using the @Mock decorator with absolute values', () => {
      beforeAll(() => {
        result = generator.create(TestClassWithAbsoluteValues);
      });

      test('then return the exact same values passed in the options', () => {
        expect(result).toMatchSnapshot({
          date: expect.any(Date),
        });
      });
    });

    describe('when using the @Mock decorator with a callback (faker)', () => {
      beforeAll(() => {
        result = generator.create(TestClassWithCallback);
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
        result = generator.create(TestClassWithEnum);
      });

      test('then return one random decoratorValue (not key)', () => {
        expect(['foo', 111, 'Bazz1234']).toContain(result.someEnumVal);
      });
    });

    describe('when using the @Mock decorator with no/empty values', () => {
      beforeAll(() => {
        result = generator.create(TestClassWithNoValues);
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
        result = generator.create(TestClassWithOtherClass);
      });

      test('then return an object with the given class', () => {
        expect(Object.keys(result.dog)).toEqual(['name', 'points']);
      });
    });

    describe('when using the @Mock decorator with a multi class', () => {
      beforeAll(() => {
        result = generator.create(TestClassWithMultiClass);
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
        result = generator.create(TestClassWithAbsoluteValues, { count: 4, locale: 'ja' });
      });

      test("then return array with length of 'count'", () => {
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveLength(4);
      });
    });
  });
});
