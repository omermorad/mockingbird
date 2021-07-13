import faker from 'faker';
import { ClassProcessor } from './class-processor';
import { ClassReflector } from './class-reflector';
import { Mock } from '../decorators/mock.decorator';

describe('ClassProcessor Integration Test', () => {
  class Magician {
    @Mock() name: string;
    @Mock() isAwesome: boolean;
  }

  describe('given a ClassProcessor instance', () => {
    let processor: ClassProcessor<any>;

    beforeAll(() => {
      processor = new ClassProcessor(faker, new ClassReflector(), 'en');
    });

    describe("when calling 'process' method", () => {
      describe('and there is no target class', () => {
        test('then throw an error indicating that not target class has been passed', () => {
          expect(() => processor.process(undefined)).toThrowError();
        });
      });

      describe('and there is an actual target class', () => {
        let returnValue;

        beforeAll(() => {
          returnValue = processor.process(Magician);
        });

        test('then return an actual instance of the class', () => {
          expect(returnValue).toBeInstanceOf(Magician);
        });
      });
    });
  });
});
