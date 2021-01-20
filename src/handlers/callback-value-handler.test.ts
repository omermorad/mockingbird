import { CallbackValueInspector } from '../handlers/callback-value-inspector';

import FakerStatic = Faker.FakerStatic;

describe('CallbackValueInspector Unit', () => {
  let dto, inspector: CallbackValueInspector;

  const fakerMock = ({
    internet: {
      email: jest.fn(),
    },
  } as unknown) as FakerStatic;

  beforeEach(() => {
    dto = {
      type: 'function',
      value: jest.fn(),
      name: 'testPropertyName',
    };
  });

  describe('given a CallbackValueInspector', () => {
    beforeAll(() => {
      inspector = new CallbackValueInspector(fakerMock);
    });

    describe("when calling 'shouldInspect' method with type function name and empty constructor name", () => {
      test('then return true', () => {
        const result = inspector.shouldInspect({ ...dto, value: { name: '' } });

        expect(result).toBeTruthy();
      });
    });

    describe("when calling 'deduceValue' ", () => {
      test('then call the callback function with same faker instance', () => {
        dto.value.mockReturnValueOnce((faker) => faker.internet.email());

        inspector.deduceValue(dto);

        expect(dto.value).toHaveBeenCalledTimes(1);
        expect(dto.value).toHaveBeenCalledWith(fakerMock);
      });
    });
  });
});
