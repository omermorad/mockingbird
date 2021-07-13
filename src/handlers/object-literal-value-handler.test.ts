import { ObjectLiteralValueHandler } from '../handlers/object-literal-value-handler';
import { Property } from '../lib/property';
import { PropertyDecoratorValue } from '../lib/property-decorator-value';

describe('ObjectLiteralValueInspector Unit', () => {
  let property: Property, handler: ObjectLiteralValueHandler;
  const OBJECT_LITERAL_VALUE = { testArbitrary: 'and-arbitrary-decoratorValue' };

  describe('given a ObjectLiteralValueInspector', () => {
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
