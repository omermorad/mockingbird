import { ClassParser } from '@mockinbird/parser';
import { MockGenerator } from './mock-generator';

/**
 * The full test of MockGenerator can be found under the 'test' folder,
 * you can find there the full integration test
 */
describe('MockGenerator', () => {
  describe('given a MockGenerator', () => {
    let generator: MockGenerator;

    const parserMock = {
      setFakerLocale: jest.fn(),
      parse: jest.fn(),
    } as unknown as ClassParser;

    beforeAll(() => {
      generator = new MockGenerator(parserMock);
    });

    describe("when calling 'create' method", () => {
      describe('with no options at all', () => {
        test('then setup parser with the default locale', () => {
          generator.create(class TestClass {});
          expect(parserMock.setFakerLocale).toHaveBeenCalledWith('en');
        });
      });

      describe('with a given locale (as argument)', () => {
        test('then setup the parser with the given locale', () => {
          generator.create(class TestClass {}, 'arbitrary-locale');
          expect(parserMock.setFakerLocale).toHaveBeenCalledWith('arbitrary-locale');
        });
      });

      describe('with an object including options', () => {
        describe("and the options including only 'count'", function () {
          test("then call the parser 'count' times", () => {
            generator.create(class TestClass {}, { count: 3 });
            expect(parserMock.setFakerLocale).toHaveBeenCalledTimes(3);
          });
        });

        describe("and the options including both 'count' and 'locale", function () {
          test('then setup the parser with the locale from the options', () => {
            generator.create(class TestClass {}, { count: 1, locale: 'arbitrary-locale' });
            expect(parserMock.setFakerLocale).toHaveBeenCalledWith('arbitrary-locale');
          });
        });
      });
    });
  });
});
