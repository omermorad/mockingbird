import { ObjectLiteralValueHandler } from '../handlers/object-literal-value-handler';
import { ObjectLiteral } from '../types/mock-options.type';

describe('ObjectLiteralValueInspector Unit', () => {
  let dto, handler: ObjectLiteralValueHandler<ObjectLiteral>;

  const OBJECT_LITERAL_VALUE = { testArbitrary: 'and-arbitrary-value' };

  describe('given a ObjectLiteralValueInspector', () => {
    beforeAll(() => {
      handler = new ObjectLiteralValueHandler();

      dto = {
        type: 'object',
        value: OBJECT_LITERAL_VALUE,
        name: 'testPropertyName',
      };
    });

    describe("when calling 'shouldHandle' method with object literal", () => {
      test('then return true', () => {
        expect(handler.shouldHandle(dto)).toBeTruthy();
      });
    });

    describe("when calling 'produceValue' method", () => {
      test('return the exact same object literal', () => {
        expect(handler.produceValue(dto)).toBe(OBJECT_LITERAL_VALUE);
      });
    });
  });
});
