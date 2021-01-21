import { ObjectLiteralValueInspector } from '../handlers/object-literal-value-inspector';

describe('ObjectLiteralValueInspector Unit', () => {
  let dto, inspector: ObjectLiteralValueInspector;

  const OBJECT_LITERAL_VALUE = { testArbitrary: 'and-arbitrary-value' };

  describe('given a ObjectLiteralValueInspector', () => {
    beforeAll(() => {
      inspector = new ObjectLiteralValueInspector();

      dto = {
        type: 'object',
        value: OBJECT_LITERAL_VALUE,
        name: 'testPropertyName',
      };
    });

    describe("when calling 'shouldInspect' method with object literal", () => {
      test('then return true', () => {
        expect(inspector.shouldInspect(dto)).toBeTruthy();
      });
    });

    describe("when calling 'deduceValue' method", () => {
      test('return the exact same object literal', () => {
        expect(inspector.deduceValue(dto)).toBe(OBJECT_LITERAL_VALUE);
      });
    });
  });
});
