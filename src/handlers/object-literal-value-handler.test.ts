import { ObjectLiteralValueHandler } from '../handlers/object-literal-value-handler';

describe('ObjectLiteralValueInspector Unit', () => {
  let dto, inspector: ObjectLiteralValueHandler;

  const OBJECT_LITERAL_VALUE = { testArbitrary: 'and-arbitrary-value' };

  describe('given a ObjectLiteralValueInspector', () => {
    beforeAll(() => {
      inspector = new ObjectLiteralValueHandler();

      dto = {
        type: 'object',
        value: OBJECT_LITERAL_VALUE,
        name: 'testPropertyName',
      };
    });

    describe("when calling 'shouldHandle' method with object literal", () => {
      test('then return true', () => {
        expect(inspector.shouldHandle(dto)).toBeTruthy();
      });
    });

    describe("when calling 'produceValue' method", () => {
      test('return the exact same object literal', () => {
        expect(inspector.produceValue(dto)).toBe(OBJECT_LITERAL_VALUE);
      });
    });
  });
});
