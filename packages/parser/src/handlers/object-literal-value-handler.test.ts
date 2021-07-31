import { Property, PropertyDecoratorValue } from '@mockinbird/reflect';
import { ObjectLiteralValueHandler } from './object-literal-value-handler';

describe('ObjectLiteralValueHandler Unit', () => {
  let property: Property, handler: ObjectLiteralValueHandler;
  const OBJECT_LITERAL_VALUE = { testArbitrary: 'and-arbitrary-decoratorValue' };

  describe('given a ObjectLiteralValueHandler', () => {
    beforeAll(() => {
      handler = new ObjectLiteralValueHandler();
      property = new Property('testPropertyName', '', new PropertyDecoratorValue(OBJECT_LITERAL_VALUE));
    });

    describe("when calling 'shouldHandle' method with object literal", () => {
      test('then return true', () => {
        expect(handler.shouldHandle(property)).toBeTruthy();
      });
    });

    describe("when calling 'produceValue' method", () => {
      test('return the exact same object literal', () => {
        expect(handler.produceValue(property)).toBe(OBJECT_LITERAL_VALUE);
      });
    });
  });
});
