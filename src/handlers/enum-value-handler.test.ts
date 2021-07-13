import { EnumValueHandler } from '../handlers/enum-value-handler';
import FakerStatic = Faker.FakerStatic;
import { Property } from '../lib/property';
import { PropertyDecoratorValue } from '../lib/property-decorator-value';

describe('EnumValueInspector Unit', () => {
  enum TestEnum {
    StateOne = 'one',
    StateTwo = 'two',
    StateThree = 'three',
  }

  const fakerMock = {
    random: {
      arrayElement: jest.fn(),
    },
  } as unknown as FakerStatic;

  let handler: EnumValueHandler;

  describe('given a EnumValueInspector', () => {
    beforeAll(() => {
      handler = new EnumValueHandler(fakerMock);
    });

    describe("when calling 'shouldHandle' method with type object and { type: enum }", () => {
      test('then return true', () => {
        const property = new Property('testPropertyName', '', new PropertyDecoratorValue({ enum: TestEnum }));
        expect(handler.shouldHandle(property)).toBeTruthy();
      });
    });

    describe("when calling 'produceValue' method", () => {
      test('then call faker random array element', () => {
        const property = new Property('testPropertyName', '', new PropertyDecoratorValue({ enum: TestEnum }));
        handler.produceValue(property);

        expect(fakerMock.random.arrayElement).toHaveBeenCalledTimes(1);
        expect(fakerMock.random.arrayElement).toHaveBeenCalledWith(['one', 'two', 'three']);
      });
    });
  });
});
