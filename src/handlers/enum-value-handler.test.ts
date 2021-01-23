import { EnumValueHandler } from '../handlers/enum-value-handler';
import { EnumObject } from '../types/fixture-options.type';

import FakerStatic = Faker.FakerStatic;

describe('EnumValueInspector Unit', () => {
  enum TestEnum {
    StateOne = 'one',
    StateTwo = 'two',
    StateThree = 'three',
  }

  const fakerMock = ({
    random: {
      arrayElement: jest.fn(),
    },
  } as unknown) as FakerStatic;

  let dto, handler: EnumValueHandler<EnumObject>;

  describe('given a EnumValueInspector', () => {
    beforeAll(() => {
      handler = new EnumValueHandler(fakerMock);

      dto = {
        type: 'object',
        value: { enum: TestEnum },
        name: 'testPropertyName',
      };
    });

    describe("when calling 'shouldHandle' method with type object and { type: enum }", () => {
      test('then return true', () => {
        expect(handler.shouldHandle(dto)).toBeTruthy();
      });
    });

    describe("when calling 'produceValue' method", () => {
      test('then call faker random array element', () => {
        dto.value = { enum: TestEnum };
        handler.produceValue(dto);

        expect(fakerMock.random.arrayElement).toHaveBeenCalledTimes(1);
        expect(fakerMock.random.arrayElement).toHaveBeenCalledWith(['one', 'two', 'three']);
      });
    });
  });
});
