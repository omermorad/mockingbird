import { MockGenerator } from './mock-generator';

const processMock = jest.fn();

jest.mock('../class-processor', () => ({
  ClassProcessor: jest.fn().mockImplementation(() => {
    return { process: processMock };
  }),
}));

describe('MockGenerator - Unit', () => {
  describe('given a Mock Factory', () => {
    afterEach(() => {
      processMock.mockClear();
    });

    class TestClass {}

    describe("when calling 'create' method without options", () => {
      test('then call process exactly once', () => {
        MockGenerator.create(TestClass);

        expect(processMock).toHaveBeenCalledTimes(1);
        expect(processMock).toHaveBeenCalledWith(TestClass);
      });
    });

    describe("when calling 'create' method with count = 3", () => {
      const count = 3;

      test('then call process 3 times ', () => {
        MockGenerator.create(TestClass, { count });

        expect(processMock).toHaveBeenCalledTimes(count);
      });
    });
  });
});
