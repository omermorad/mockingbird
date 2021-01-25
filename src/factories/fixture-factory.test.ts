import { FixtureFactory } from './fixture-factory';
import { ClassProcessor } from '../class-processor';

ClassProcessor.prototype.process = jest.fn();

describe('Fixture Factory - Unit', () => {
  describe('given a Fixture Factory', () => {
    class TestClass {}

    describe("when calling 'create' method without options", () => {
      test('then call process exactly once', () => {
        FixtureFactory.create(TestClass);

        expect(ClassProcessor.prototype.process).toHaveBeenCalledTimes(1);
        expect(ClassProcessor.prototype.process).toHaveBeenCalledWith(TestClass);
      });
    });

    // describe("when calling 'create' method without extra options ({ count: 3 })'", () => {
    //   test('then call process exactly once', () => {
    //     FixtureFactory.create(TestClass);
    //
    //     expect(ClassProcessor.prototype.process).toHaveBeenCalledTimes(1);
    //     // expect(ClassProcessor.prototype.process).toHaveBeenCalledWith(TestClass);
    //   });
    // });
  });
});
