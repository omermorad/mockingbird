import { PropertyDto } from '../types/property-dto.interface';
import { SingleClassValueInspector } from '../handlers/single-class-value-inspector';
import { ClassProcessor } from '../class-processor';

import FakerStatic = Faker.FakerStatic;

describe('SingleClassValueInspector Unit', () => {
  let inspector: SingleClassValueInspector;
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
      inspector = new SingleClassValueInspector({} as FakerStatic, classProcessorMock);
    });

    describe("when calling 'shouldInspect' with a none-primitive, 'function' type", () => {
      test('then return true', () => {
        expect(inspector.shouldInspect(dto)).toBeTruthy();
      });
    });

    describe("when calling 'deduceValue' method", () => {
      test("then call 'process' with the given class", () => {
        inspector.deduceValue(dto);

        expect(classProcessorMock.process).toHaveBeenCalledTimes(1);
        expect(classProcessorMock.process).toHaveBeenCalledWith(DTO_CLASS_VALUE);
      });
    });
  });
});
