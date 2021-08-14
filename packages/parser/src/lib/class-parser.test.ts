import { Mock, ClassReflector } from '@mockinbird/reflect';
import { ClassParser } from './class-parser';
import { Faker } from '@mockinbird/types';

describe('ClassParser Unit Test', () => {
  class Magician {
    @Mock() name = 'default-name';
    @Mock() isAwesome: boolean;
    @Mock() rating: number;
  }

  const fakerMock: jest.Mocked<Partial<Faker>> = {
    setLocale: jest.fn(),
    datatype: { boolean: () => true, number: () => 12345 } as jest.Mocked<Faker['datatype']>,
    random: { alpha: jest.fn() } as unknown as jest.Mocked<Faker['random']>,
    name: { firstName: jest.fn().mockReturnValueOnce('FIRST_NAME') } as any,
  };

  describe('given a ClassParser instance', () => {
    let parser: ClassParser;

    beforeAll(() => {
      parser = new ClassParser(fakerMock as Faker, new ClassReflector());
    });

    describe("when calling 'parse' method", () => {
      describe('and there is no target class', () => {
        test('then throw an error indicating that no target class has been passed', () => {
          expect(() => parser.parse(undefined)).toThrowError();
        });
      });

      describe('and there is an actual target class', () => {
        let returnValue;

        beforeAll(() => {
          returnValue = parser.parse(Magician);
        });

        describe('and config is including mutations of key-value pairs', () => {
          beforeAll(() => {
            returnValue = parser.parse(Magician, { mutations: { name: 'Houdini' } });
          });

          test("then return an instance where the 'name' property is 'Houdini'", () => {
            expect(returnValue.name).toBe('Houdini');
          });
        });

        describe('and config is including mutations callback', () => {
          beforeAll(() => {
            returnValue = parser.parse(Magician, {
              mutations: (faker) => ({ name: faker.name.firstName() }),
            });
          });

          test('then call faker firstName method', () => {
            expect(fakerMock.name.firstName).toHaveBeenCalledTimes(1);
          });

          test("then set the value of prop 'name' to be faker firstName return value", () => {
            expect(returnValue.name).toBe('FIRST_NAME');
          });
        });

        describe('and config is including omit key-value pairs', () => {
          beforeAll(() => {
            returnValue = parser.parse(Magician, { omit: ['name'] });
          });

          test('then return the default value of the instance', () => {
            expect(returnValue.name).toBe('default-name');
          });
        });

        test('then return an actual instance of the class', () => {
          expect(returnValue).toBeInstanceOf(Magician);
        });
      });
    });

    describe("when calling 'setFakerLocale'", () => {
      beforeAll(() => parser.setFakerLocale('jp'));

      test('then call faker locale function', () => {
        expect(fakerMock.setLocale).toHaveBeenCalledWith('jp');
      });
    });
  });
});
