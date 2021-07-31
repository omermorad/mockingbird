import { Faker } from '@mockinbird/types';
import { Property, PropertyDecoratorValue } from '@mockinbird/reflect';

import { EnumValueHandler } from './enum-value-handler';

describe('EnumValueHandler Unit', () => {
  enum TestEnum {
    StateOne = 'one',
    StateTwo = 'two',
    StateThree = 'three',
  }

  const fakerMock = {
    random: {
      arrayElement: jest.fn(),
    },
  } as unknown as Faker;

  let handler: EnumValueHandler;

  describe('given a EnumValueHandler', () => {
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
