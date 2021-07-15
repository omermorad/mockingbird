import { Property, PropertyDecoratorValue } from '@mockinbird/reflect';
import { Faker } from '@mockinbird/types';
import { SingleClassValueHandler } from './single-class-value-handler';
import { ClassProcessor } from '../lib/class-processor';

describe('SingleClassValueInspector Unit', () => {
  let handler: SingleClassValueHandler;
  const DTO_CLASS_VALUE = class TestClass {};

  const property: Property = new Property('testPropertyName', 'TestClass', new PropertyDecoratorValue(DTO_CLASS_VALUE));

  const classProcessorMock = {
    process: jest.fn(),
  } as unknown as ClassProcessor<any>;

  describe('given a SingleClassValueInspector', () => {
    beforeAll(() => {
      handler = new SingleClassValueHandler({} as Faker, classProcessorMock);
    });

    describe("when calling 'shouldHandle' with a none-primitive, 'function' type", () => {
      test('then return true', () => {
        expect(handler.shouldHandle(property)).toBeTruthy();
      });
    });

    describe("when calling 'produceValue' method", () => {
      test("then call 'process' with the given class", () => {
        handler.produceValue(property);

        expect(classProcessorMock.process).toHaveBeenCalledTimes(1);
        expect(classProcessorMock.process).toHaveBeenCalledWith(DTO_CLASS_VALUE);
      });
    });
  });
});
