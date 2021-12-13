import { Container } from 'typedi';
import { Property, PropertyDecoratorValue } from '@mockingbird/reflect';
import { Faker } from '@mockingbird/common';
import { FakerCallbackValueHandler } from './faker-callback-value-handler';

describe('CallbackValueHandler Unit', () => {
  let handler: FakerCallbackValueHandler;

  const fakerMock = { internet: { email: jest.fn() } } as unknown as Faker;

  beforeAll(() => {
    Container.set<Faker>('Faker', fakerMock);
    handler = Container.get<FakerCallbackValueHandler>(FakerCallbackValueHandler);
  });

  describe('given a CallbackValueHandler', () => {
    describe('when perform handling check with faker callback', () => {
      test('then return true', () => {
        const property = new Property(
          'testPropertyName',
          '',
          new PropertyDecoratorValue({
            value: (faker) => faker.internet.email(),
          })
        );

        const result = handler.shouldHandle(property);

        expect(result).toBeTruthy();
      });
    });

    describe('when perform handling check with arbitrary callback', () => {
      test('then return false', () => {
        const property = new Property(
          'testPropertyName',
          'A',
          new PropertyDecoratorValue({
            value: () => class A {},
          })
        );

        const result = handler.shouldHandle(property);

        expect(result).toBeFalsy();
      });
    });

    describe("when calling 'produceValue' ", () => {
      test('then call the callback function with same faker instance', () => {
        const property = new Property('testPropertyName', '', new PropertyDecoratorValue({ value: jest.fn() }));
        handler.produceValue(property);

        expect(property.propertyValue.decorator.value).toHaveBeenCalledTimes(1);
        expect(property.propertyValue.decorator.value).toHaveBeenCalledWith(fakerMock);
      });
    });
  });
});
