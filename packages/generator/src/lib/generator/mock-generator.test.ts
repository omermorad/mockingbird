import { MockGenerator } from './mock-generator';
import { ClassParser } from '@mockinbird/parser';

/**
 * The full test of MockGenerator can be found under the 'test' folder,
 * you can find there the full integration test
 */
describe('MockGenerator Unit Test', () => {
  let generator: MockGenerator;

  class TestClass {
    test: string;
  }

  const parserMock = {
    setFakerLocale: jest.fn(),
    parse: jest.fn(),
  } as unknown as jest.Mocked<ClassParser>;

  beforeAll(() => {
    generator = new MockGenerator(parserMock);
    jest.clearAllMocks();
  });

  scenario('generate a SIMPLE mock from a class', () => {
    given('I want to generate a new mock from a class', () => {
      when('I call the create method with no configurations', () => {
        beforeAll(() => generator.create(TestClass));

        test('then setup parser with the default locale', () => {
          expect(parserMock.setFakerLocale).toHaveBeenCalledWith('en');
        });

        test('then call parse one time only', () => {
          expect(parserMock.parse).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  scenario('generate mock from a class with a different configurations', () => {
    given('I want to generate a mock with different locale', () => {
      when('creating a new mock from generator passing the proper params', () => {
        beforeAll(() => generator.create(TestClass, { locale: 'arbitrary-locale' }));

        then('setup the parser with the locale from the options', () => {
          expect(parserMock.setFakerLocale).toHaveBeenCalledWith('arbitrary-locale');
        });
      });
    });

    given('I want to generate a mock and override different values', () => {
      when('creating a new mock from generator passing the proper param', () => {
        beforeAll(() => generator.create(TestClass, { override: { test: 'value' } }));

        then('call parse with the valid options', () => {
          expect(parserMock.parse).toHaveBeenCalledWith(TestClass, { override: { test: 'value' } });
        });
      });
    });

    given('I want to generate a mock and ignore different values', () => {
      when('creating a new mock from generator passing the proper param', () => {
        beforeAll(() => generator.create(TestClass, { ignore: ['test'] }));

        then('call parse with the valid options', () => {
          expect(parserMock.parse).toHaveBeenCalledWith(TestClass, { ignore: ['test'] });
        });
      });
    });

    given('I want to generate a mock and convert it to plain', () => {
      when('creating a new mock from generator passing the proper param', () => {
        let result;

        beforeAll(() => {
          parserMock.parse.mockReturnValueOnce(
            new (class Cat {
              toy = new (class Toy {
                bell = new (class Bell {})();
              })();
            })()
          );

          result = generator.create(TestClass, { plain: true });
        });

        then('', () => {
          const isClass = (target) => target instanceof Object && target.constructor.name !== 'Object';

          expect(isClass(result)).toBeFalsy();
          expect(isClass(result.toy)).toBeFalsy();
          expect(isClass(result.toy.bell)).toBeFalsy();
        });
      });
    });
  });
});
