import { PropertyDto } from '../types/property-dto.interface';
import { SingleClassValueHandler } from '../handlers/single-class-value-handler';
import { ClassProcessor } from '../class-processor';

import FakerStatic = Faker.FakerStatic;

describe('SingleClassValueInspector Unit', () => {
  let inspector: SingleClassValueHandler;
  const DTO_CLASS_VALUE = class TestClass {};

  const dto: PropertyDto = {
    type: 'function',
    value: DTO_CLASS_VALUE,
    name: 'testPropertyName',
    constructorName: 'TestClass',
  };

  const classProcessorMock = ({
    process: jest.fn(),
  } as unknown) as ClassProcessor<any>;

  describe('given a SingleClassValueInspector', () => {
    beforeAll(() => {
      inspector = new SingleClassValueHandler({} as FakerStatic, classProcessorMock);
    });

    describe("when calling 'shouldHandle' with a none-primitive, 'function' type", () => {
      test('then return true', () => {
        expect(inspector.shouldHandle(dto)).toBeTruthy();
      });
    });

    describe("when calling 'produceValue' method", () => {
      test("then call 'process' with the given class", () => {
        inspector.produceValue(dto);

        expect(classProcessorMock.process).toHaveBeenCalledTimes(1);
        expect(classProcessorMock.process).toHaveBeenCalledWith(DTO_CLASS_VALUE);
      });
    });
  });
});
