import { FixtureFactory } from './fixture-factory';

const processMock = jest.fn();
jest.mock('../class-processor', () => {
  return {
    ClassProcessor: jest.fn().mockImplementation(() => {
      return { process: processMock };
    }),
  };
});

describe('Fixture Factory - Unit', () => {
  describe('given a Fixture Factory', () => {
    afterEach(() => {
      processMock.mockClear();
    });
    class TestClass {}

    describe("when calling 'create' method without options", () => {
      test('then call process exactly once', () => {
        FixtureFactory.create(TestClass);

        expect(processMock).toHaveBeenCalledTimes(1);
        expect(processMock).toHaveBeenCalledWith(TestClass);
      });
    });

    describe("when calling 'create' method with count = 3", () => {
      const count = 3;
      test('then call process 3 times ', () => {
        FixtureFactory.create(TestClass, { count });

        expect(processMock).toHaveBeenCalledTimes(count);
      });
    });
  });
});
