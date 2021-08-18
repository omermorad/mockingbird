import { Property, PropertyDecoratorValue } from '@mockinbird/reflect';
import { Faker } from '@mockinbird/types';
import { SingleClassValueHandler } from './single-class-value-handler';

describe('SingleClassValueHandler Unit', () => {
  const DTO_CLASS_VALUE = class TestClass {};
  const property = new Property('testPropertyName', 'TestClass', new PropertyDecoratorValue(DTO_CLASS_VALUE));

  let handler: SingleClassValueHandler;

  describe('given a SingleClassValueHandler', () => {
    beforeAll(() => {
      handler = new SingleClassValueHandler({} as Faker);
    });

    describe("when calling 'shouldHandle' with a none-primitive, 'function' type", () => {
      test('then return true', () => {
        expect(handler.shouldHandle(property)).toBeTruthy();
      });
    });

    describe("when calling 'produceValue' method", () => {
      test("then call 'parse' with the given class", () => {
        expect(handler.produceValue(property)).toBeInstanceOf(DTO_CLASS_VALUE);
      });
    });
  });
});
