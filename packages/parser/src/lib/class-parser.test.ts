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
  };

  describe('given a ClassParser instance', () => {
    let parser: ClassParser;

    beforeAll(() => {
      parser = new ClassParser(fakerMock as Faker, new ClassReflector());
    });

    describe("when calling 'parse' method", () => {
      describe('and there is no target class', () => {
        test('then throw an error indicating that not target class has been passed', () => {
          expect(() => parser.parse(undefined)).toThrowError();
        });
      });

      describe('and there is an actual target class', () => {
        let returnValue;

        beforeAll(() => {
          returnValue = parser.parse(Magician);
        });

        describe('and config is including overrides key-value pairs', () => {
          beforeAll(() => {
            returnValue = parser.parse(Magician, { overrides: { name: 'Houdini' } });
          });

          test("then return an instance which 'name' property is always 'Houdini'", () => {
            expect(returnValue.name).toBe('Houdini');
          });

          describe('and the key-value pairs including a callback', () => {
            beforeAll(() => {
              returnValue = parser.parse(Magician, { overrides: { name: (faker) => faker.random.alpha() } });
            });

            test('then invoke the callback function with instance of faker', () => {
              expect(fakerMock.random.alpha).toHaveBeenCalledTimes(1);
            });
          });
        });

        describe('and config is including ignore key-value pairs', () => {
          beforeAll(() => {
            returnValue = parser.parse(Magician, { ignore: ['name'] });
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
