import { Container } from 'typedi';
import { LazyEnum, Faker } from '@mockingbird/common';
import { Property, PropertyDecoratorValue } from '@mockingbird/reflect';
import { EnumValueHandler } from './enum-value-handler';

describe('EnumValueHandler Unit', () => {
  let handler: EnumValueHandler;

  enum TestEnum {
    StateOne = 'one',
    StateTwo = 'two',
    StateThree = 'three',
  }

  const fakerMock = {
    random: { arrayElement: jest.fn() },
  } as unknown as Faker;

  beforeAll(() => {
    Container.set<Faker>('Faker', fakerMock);
    handler = Container.get<EnumValueHandler>(EnumValueHandler);
  });

  describe('given an EnumValueHandler', () => {
    describe("when calling 'shouldHandle' method with type object and { type: enum }", () => {
      test('then return true', () => {
        const property = new Property(
          'testPropertyName',
          '',
          new PropertyDecoratorValue({
            value: { enum: () => TestEnum },
          })
        );

        expect(handler.shouldHandle(property)).toBeTruthy();
      });
    });

    describe("when calling 'produceValue' method", () => {
      let property, result;

      beforeAll(() => {
        property = new Property(
          'testPropertyName',
          '',
          new PropertyDecoratorValue({
            value: { enum: jest.fn().mockReturnValue(TestEnum) },
          })
        );

        result = handler.produceValue(property);
      });

      test('then invoke the enum function', () => {
        const lol = property.propertyValue.decorator.value as LazyEnum;
        expect(lol.enum).toHaveBeenCalled();
      });

      test('then generate random value from the enum', () => {
        expect(Object.values(TestEnum)).toContain(result);
      });
    });
  });
});
