import { PropertyDto } from '../types/property-dto.interface';
import { ArrayValueHandler } from './array-value-handler';
import { ClassProcessor } from '../class-processor';
import { MultiClass } from '../types/mock-options.type';

import FakerStatic = Faker.FakerStatic;

describe('ArrayValueHandler Unit', () => {
  const DTO_CLASS_VALUE = class TestClass {};
  const DEFAULT_COUNT_FOR_DTO = 3;

  let handler: ArrayValueHandler<MultiClass>;

  const dto: PropertyDto<MultiClass> = {
    type: 'object',
    value: { type: DTO_CLASS_VALUE, count: DEFAULT_COUNT_FOR_DTO },
    name: 'testPropertyName',
    constructorName: 'TestClass',
  };

  const classProcessorMock = ({
    process: jest.fn(),
  } as unknown) as ClassProcessor<any>;

  const fakerMock = ({
    random: {
      alpha: jest.fn(),
      number: jest.fn(),
      boolean: jest.fn(),
      alphaNumeric: jest.fn(),
    },
    date: {
      recent: jest.fn(),
    },
  } as unknown) as FakerStatic;

  describe('given a ArrayValueHandler', () => {
    beforeAll(() => {
      handler = new ArrayValueHandler(fakerMock, classProcessorMock);
    });

    describe("when calling 'shouldHandle' with type 'object' and value of multi class ({ type: ClassType })", () => {
      test('then return true', () => {
        expect(handler.shouldHandle(dto)).toBeTruthy();
      });
    });

    describe("when calling 'produceValue' method", () => {
      describe('and the value is null', () => {
        test('return null', () => {
          dto.value = null;
          expect(handler.produceValue(dto)).toBeNull();
        });
      });

      describe('and value.type (class type) is Primitive', () => {
        describe('and the primitive value is String', () => {
          let result;

          beforeAll(() => {
            dto.value = { type: String, count: DEFAULT_COUNT_FOR_DTO };
            result = handler.produceValue(dto);
          });

          test('then call random alpha string from faker', () => {
            expect(fakerMock.random.alpha).toHaveBeenCalledTimes(DEFAULT_COUNT_FOR_DTO);
          });

          test("then return an array of 'count' strings", () => {
            expect(result).toBeInstanceOf(Array);
            expect(result).toHaveLength(DEFAULT_COUNT_FOR_DTO);
          });
        });
      });

      describe('and the primitive value is Number', () => {
        let result;

        beforeAll(() => {
          dto.value = { type: Number, count: DEFAULT_COUNT_FOR_DTO };
          result = handler.produceValue(dto);
        });

        test('then call random alpha string from faker', () => {
          expect(fakerMock.random.number).toHaveBeenCalledTimes(DEFAULT_COUNT_FOR_DTO);
          expect(fakerMock.random.number).toHaveBeenCalledWith(1000);
        });

        test("then return an array of 'count' numbers", () => {
          expect(result).toBeInstanceOf(Array);
          expect(result).toHaveLength(DEFAULT_COUNT_FOR_DTO);
        });
      });

      describe('and the primitive value is Boolean', () => {
        test('and the primitive value is Boolean', () => {
          dto.value = { type: Boolean, count: DEFAULT_COUNT_FOR_DTO };

          handler.produceValue(dto);
          expect(fakerMock.random.boolean).toHaveBeenCalledTimes(DEFAULT_COUNT_FOR_DTO);
        });
      });

      describe('and the primitive value is Date', () => {
        test('and the primitive value is Date', () => {
          dto.value = { type: Date, count: DEFAULT_COUNT_FOR_DTO };

          handler.produceValue(dto);
          expect(fakerMock.date.recent).toHaveBeenCalledTimes(DEFAULT_COUNT_FOR_DTO);
        });
      });
    });

    describe('and value type is an actual class (none a primitive)', () => {
      test("then call 'process' with 'count' times", () => {
        dto.value = { type: DTO_CLASS_VALUE, count: DEFAULT_COUNT_FOR_DTO };

        handler.produceValue(dto);
        expect(classProcessorMock.process).toHaveBeenCalledTimes(DEFAULT_COUNT_FOR_DTO);
      });
    });
  });
});
