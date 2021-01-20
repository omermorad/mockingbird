import { PropertyDto } from '../types/property-dto.interface';
import { EnumValueInspector } from '../handlers/enum-value-inspector';

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

  let dto, inspector: EnumValueInspector;

  describe('given a EnumValueInspector', () => {
    beforeAll(() => {
      inspector = new EnumValueInspector(fakerMock);

      dto = {
        type: 'object',
        value: { enum: TestEnum },
        name: 'testPropertyName',
      };
    });

    describe("when calling 'shouldInspect' method with type object and { type: enum }", () => {
      test('then return true', () => {
        expect(inspector.shouldInspect(dto)).toBeTruthy();
      });
    });

    describe("when calling 'deduceValue' method", () => {
      test('then call faker random array element', () => {
        dto.value = { enum: TestEnum };
        inspector.deduceValue(dto as PropertyDto);

        expect(fakerMock.random.arrayElement).toHaveBeenCalledTimes(1);
        expect(fakerMock.random.arrayElement).toHaveBeenCalledWith(['one', 'two', 'three']);
      });
    });
  });
});
