import { Mock, ClassReflector } from '@mockinbird/reflect';
import faker from 'faker';
import { ClassParser } from './class-parser';

describe('ClassParser Integration Test', () => {
  class Magician {
    @Mock() name: string;
    @Mock() isAwesome: boolean;
  }

  describe('given a ClassParser instance', () => {
    let processor: ClassParser<any>;

    beforeAll(() => {
      processor = new ClassParser(faker, new ClassReflector(), 'en');
    });

    describe("when calling 'parse' method", () => {
      describe('and there is no target class', () => {
        test('then throw an error indicating that not target class has been passed', () => {
          expect(() => processor.parse(undefined)).toThrowError();
        });
      });

      describe('and there is an actual target class', () => {
        let returnValue;

        beforeAll(() => {
          returnValue = processor.parse(Magician);
        });

        test('then return an actual instance of the class', () => {
          expect(returnValue).toBeInstanceOf(Magician);
        });
      });
    });
  });
});
