import { Container } from 'typedi';
import { Property, PropertyDecoratorValue } from '@mockingbird/reflect';
import { Faker } from '@mockingbird/common';
import { ClassCallbackHandler } from './class-callback-handler';

describe('SingleClassValueHandler Unit', () => {
  let handler: ClassCallbackHandler;

  const DTO_CLASS_VALUE = class TestClass {};

  const property = new Property(
    'testPropertyName',
    'TestClass',
    new PropertyDecoratorValue({ value: () => DTO_CLASS_VALUE })
  );

  beforeAll(() => {
    Container.set('Faker', Faker);
    handler = Container.get<ClassCallbackHandler>(ClassCallbackHandler);
  });

  describe('given a SingleClassValueHandler', () => {
    describe("when calling 'shouldHandle' with a none-primitive, 'function' type", () => {
      test('then return true', () => {
        expect(handler.shouldHandle(property)).toBeTruthy();
      });
    });

    describe("when calling 'produceValue' method", () => {
      test("then call 'parse' with the given class", () => {
        expect(handler.produceValue(property, { reference: undefined })).toBeInstanceOf(DTO_CLASS_VALUE);
      });
    });
  });
});
