import { CallbackValueHandler } from '../handlers/callback-value-handler';

import FakerStatic = Faker.FakerStatic;

describe('CallbackValueInspector Unit', () => {
  let dto, inspector: CallbackValueHandler;

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
      inspector = new CallbackValueHandler(fakerMock);
    });

    describe("when calling 'shouldHandle' method with type function name and empty constructor name", () => {
      test('then return true', () => {
        const result = inspector.shouldHandle({ ...dto, value: { name: '' } });

        expect(result).toBeTruthy();
      });
    });

    describe("when calling 'produceValue' ", () => {
      test('then call the callback function with same faker instance', () => {
        dto.value.mockReturnValueOnce((faker) => faker.internet.email());

        inspector.produceValue(dto);

        expect(dto.value).toHaveBeenCalledTimes(1);
        expect(dto.value).toHaveBeenCalledWith(fakerMock);
      });
    });
  });
});
