import { ObjectLiteralValueHandler } from '../handlers/object-literal-value-handler';
import { ObjectLiteral } from '../types/fixture-options.type';
import { Property } from '../property';
import { PropertyDecoratorValue } from '../property-decorator-value';
import { PropertyInterface } from '../types/property.interface';

describe('ObjectLiteralValueInspector Unit', () => {
  let property: PropertyInterface<ObjectLiteral>, handler: ObjectLiteralValueHandler<ObjectLiteral>;
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
