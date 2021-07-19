import { Mock, ClassReflector } from '@mockinbird/reflect';
import { Faker } from '@mockinbird/types';
import { ClassParser } from './class-parser';

describe('ClassParser Integration Test', () => {
  class Magician {
    @Mock() name: string;
    @Mock() isAwesome: boolean;
  }

  const setLocale = jest.spyOn(Faker, 'setLocale');

  describe('given a ClassParser instance', () => {
    let processor: ClassParser;

    beforeAll(() => {
      processor = new ClassParser(Faker, new ClassReflector());
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

    describe("when calling 'setFakerLocale'", () => {
      beforeAll(() => processor.setFakerLocale('jp'));

      test('then call faker locale function', () => {
        expect(setLocale).toHaveBeenCalledWith('jp');
      });
    });
  });
});
