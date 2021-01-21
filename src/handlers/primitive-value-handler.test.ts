import { PrimitiveValueInspector } from './primitive-value-inspector';
import { PropertyDto } from '../types/property-dto.interface';

import FakerStatic = Faker.FakerStatic;

describe('PrimitiveValueInspector Unit', () => {
  let dto, inspector: PrimitiveValueInspector;

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
    setLocale: () => jest.fn(),
  } as unknown) as FakerStatic;

  describe('given a PrimitiveValueInspector', () => {
    beforeAll(() => {
      inspector = new PrimitiveValueInspector(fakerMock);
    });

    describe("when calling 'shouldInspect' method", () => {
      const dto: PropertyDto = {
        name: 'some-prop-name',
        value: undefined,
        type: 'not-a-function',
        constructorName: null,
      };

      describe('and the property type is not a function', () => {
        test('then return true when constructor name is a String', () => {
          dto.constructorName = 'String';
          expect(inspector.shouldInspect(dto)).toBeTruthy();
        });

        test('then return true when constructor name is a Number', () => {
          dto.constructorName = 'Number';
          expect(inspector.shouldInspect(dto)).toBeTruthy();
        });

        test('then return true when constructor name is a Boolean', () => {
          dto.constructorName = 'Boolean';
          expect(inspector.shouldInspect(dto)).toBeTruthy();
        });

        test('then return true when constructor name is a Date', () => {
          dto.constructorName = 'Date';
          expect(inspector.shouldInspect(dto)).toBeTruthy();
        });
      });
    });

    describe("when calling 'deduceValue' method", () => {
      beforeEach(() => {
        dto = { type: 'string', value: 'TestStr', name: 'name' };
      });

      describe('and there is a value', () => {
        test('then return the exact same value', () => {
          dto.value = 'TestStr';
          expect(inspector.deduceValue(dto)).toBe('TestStr');

          dto.value = 12345;
          expect(inspector.deduceValue(dto)).toBe(12345);

          dto.value = true;
          expect(inspector.deduceValue(dto)).toBe(true);
        });
      });

      describe('and the value is including { type } inside (multi class)', () => {
        test('then throw an error about type mismatch', () => {
          dto.value = { type: String, count: 3 };
          expect(() => inspector.deduceValue(dto)).toThrowError(Error);
        });
      });

      describe('and there is no value (empty value)', () => {
        beforeEach(() => {
          dto.value = undefined;
        });

        describe('and the constructor is a String', () => {
          test('then generate a random string from faker', () => {
            dto.constructorName = 'String';

            inspector.deduceValue(dto);

            expect(fakerMock.random.alpha).toHaveBeenCalledTimes(1);
          });
        });

        describe('and the constructor is a Number', () => {
          test('then return a random number between 1 to 1000 from faker', () => {
            dto.constructorName = 'Number';

            inspector.deduceValue(dto);

            expect(fakerMock.random.number).toHaveBeenCalledTimes(1);
            expect(fakerMock.random.number).toHaveBeenCalledWith(1000);
          });
        });

        describe('and the constructor is a Boolean', () => {
          test('then return random boolean value', () => {
            dto.constructorName = 'Boolean';

            inspector.deduceValue(dto);
            expect(fakerMock.random.boolean).toHaveBeenCalledTimes(1);
          });
        });

        describe('and the constructor is a Date', () => {
          test('then return a random date', () => {
            dto.constructorName = 'Date';

            inspector.deduceValue(dto);
            expect(fakerMock.random.boolean).toHaveBeenCalledTimes(1);
          });
        });

        describe('and constructor is not a primitive one', () => {
          test('then return alpha numeric string', () => {
            dto.constructorName = 'not-a-primitive';

            inspector.deduceValue(dto);
            expect(fakerMock.random.alphaNumeric).toHaveBeenCalledTimes(1);
          });
        });
      });
    });
  });
});
