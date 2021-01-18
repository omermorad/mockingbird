import { PrimitiveValueInspector } from 'src/handlers/value-handlers/primitive-value-inspector';

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

  beforeEach(() => {
    dto = { type: 'string', value: 'TestStr', name: 'name' };
  });

  describe('given a PrimitiveValueInspector', () => {
    beforeAll(() => {
      inspector = new PrimitiveValueInspector(fakerMock);
    });

    describe('when there is a value', () => {
      test('then return the exact same value', () => {
        dto.value = 'TestStr';
        expect(inspector.deduceValue(dto)).toBe('TestStr');

        dto.value = 12345;
        expect(inspector.deduceValue(dto)).toBe(12345);

        dto.value = true;
        expect(inspector.deduceValue(dto)).toBe(true);
      });
    });

    describe('when there is no value', () => {
      describe('and the constructor is a String', () => {
        test('then generate a random string from faker', () => {
          dto.value = false;
          dto.constructorName = 'String';

          inspector.deduceValue(dto);

          expect(fakerMock.random.alpha).toHaveBeenCalledTimes(1);
        });
      });

      describe('and the constructor is a Number', () => {
        test('then return a random number between 1 to 1000', () => {
          dto.value = false;
          dto.constructorName = 'Number';

          inspector.deduceValue(dto);

          expect(fakerMock.random.number).toHaveBeenCalledTimes(1);
          expect(fakerMock.random.number).toHaveBeenCalledWith(1000);
        });
      });

      describe('and the constructor is a Boolean', () => {
        test('then return random boolean value', () => {
          dto.value = false;
          dto.constructorName = 'Boolean';

          inspector.deduceValue(dto);
          expect(fakerMock.random.boolean).toHaveBeenCalledTimes(1);
        });
      });

      describe('and the constructor is a Date', () => {
        test('then return a random date', () => {
          dto.value = false;
          dto.constructorName = 'Date';

          inspector.deduceValue(dto);
          expect(fakerMock.random.boolean).toHaveBeenCalledTimes(1);
        });
      });

      describe('and constructor is not a primitive one', () => {
        test('then return alpha numeric string', () => {
          dto.value = false;
          dto.constructorName = 'not-a-primitive';

          inspector.deduceValue(dto);
          expect(fakerMock.random.alphaNumeric).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
