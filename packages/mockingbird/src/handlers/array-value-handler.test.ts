import { ArrayValueHandler } from './array-value-handler';
import { ClassProcessor } from '../lib/class-processor';
import { MultiClass } from '../types/mock-options.type';
import FakerStatic = Faker.FakerStatic;
import { Property } from '../lib/property';
import { PropertyDecoratorValue } from '../lib/property-decorator-value';

describe('ArrayValueHandler Unit', () => {
  const DTO_CLASS_VALUE = class TestClass {};
  const DEFAULT_COUNT_FOR_DTO = 3;

  let handler: ArrayValueHandler;

  function createProperty(mockValue: MultiClass): Property {
    return new Property('testPropertyName', 'TestClass', new PropertyDecoratorValue(mockValue));
  }

  const classProcessorMock = {
    process: jest.fn(),
  } as unknown as ClassProcessor<any>;

  const fakerMock = {
    random: {
      alpha: jest.fn(),
      number: jest.fn(),
      boolean: jest.fn(),
      alphaNumeric: jest.fn(),
    },
    date: {
      recent: jest.fn(),
    },
  } as unknown as FakerStatic;

  describe('given a ArrayValueHandler', () => {
    beforeAll(() => {
      handler = new ArrayValueHandler(fakerMock, classProcessorMock);
    });

    describe("when calling 'shouldHandle' with type 'object' and decoratorValue of multi class ({ type: ClassType })", () => {
      test('then return true', () => {
        expect(
          handler.shouldHandle(createProperty({ type: DTO_CLASS_VALUE, count: DEFAULT_COUNT_FOR_DTO }))
        ).toBeTruthy();
      });
    });

    describe("when calling 'produceValue' method", () => {
      describe('and the decoratorValue is null', () => {
        test('then return null', () => {
          expect(handler.produceValue(createProperty(null))).toBeNull();
        });
      });

      describe('and decoratorValue.type (class type) is Primitive', () => {
        describe('and the primitive decoratorValue is String', () => {
          let result;

          beforeAll(() => {
            result = handler.produceValue(createProperty({ type: String, count: DEFAULT_COUNT_FOR_DTO }));
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

      describe('and the primitive decoratorValue is Number', () => {
        let result;

        beforeAll(() => {
          result = handler.produceValue(createProperty({ type: Number, count: DEFAULT_COUNT_FOR_DTO }));
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

      describe('and the primitive decoratorValue is Boolean', () => {
        test('and the primitive decoratorValue is Boolean', () => {
          handler.produceValue(createProperty({ type: Boolean, count: DEFAULT_COUNT_FOR_DTO }));
          expect(fakerMock.random.boolean).toHaveBeenCalledTimes(DEFAULT_COUNT_FOR_DTO);
        });
      });

      describe('and the primitive decoratorValue is Date', () => {
        test('and the primitive decoratorValue is Date', () => {
          handler.produceValue(createProperty({ type: Date, count: DEFAULT_COUNT_FOR_DTO }));
          expect(fakerMock.date.recent).toHaveBeenCalledTimes(DEFAULT_COUNT_FOR_DTO);
        });
      });
    });

    describe('and decoratorValue type is an actual class (none a primitive)', () => {
      test("then call 'process' with 'count' times", () => {
        handler.produceValue(createProperty({ type: DTO_CLASS_VALUE, count: DEFAULT_COUNT_FOR_DTO }));
        expect(classProcessorMock.process).toHaveBeenCalledTimes(DEFAULT_COUNT_FOR_DTO);
      });
    });
  });
});
