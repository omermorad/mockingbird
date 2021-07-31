import { ClassParser } from '@mockinbird/parser';
import { MockGenerator } from './mock-generator';
import { MockGeneratorOptions } from '../../types/mock-generator-options.interface';

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
        beforeAll(() => generator.create(class TestClass {}));

        test('then setup parser with the default locale', () => {
          expect(parserMock.setFakerLocale).toHaveBeenCalledWith('en');
        });

        test('then use/call parse one time only', () => {
          expect(parserMock.parse).toHaveBeenCalledTimes(1);
        });
      });

      describe('with an object argument containing the config/options (with all the properties)', () => {
        class TestClass {}

        const options: MockGeneratorOptions = {
          count: 3,
          locale: 'arbitrary-locale',
          override: { prop: 'value' },
          ignore: ['test'],
        };

        beforeAll(() => {
          jest.resetAllMocks();
          generator.create(TestClass, options);
        });

        test('then setup the parser with the locale from the options', () => {
          expect(parserMock.setFakerLocale).toHaveBeenCalledWith('arbitrary-locale');
        });

        test('then call parse exactly 3 times', () => {
          expect(parserMock.parse).toHaveBeenCalledTimes(3);
        });

        test('then call parse with the rest of the options', () => {
          expect(parserMock.parse).toHaveBeenCalledWith(TestClass, { override: { prop: 'value' }, ignore: ['test'] });
        });
      });
    });
  });
});
