import { PropertyDecoratorValue } from './property-decorator-value';

describe('PropertyDecoratorValue Unit', () => {
  describe('given a PropertyDecoratorValue with a string value', () => {
    describe('when checking if it is an object', () => {
      test('then return true', () => {
        const value = new PropertyDecoratorValue({});
        expect(value.isObject()).toBeTruthy();
      });
    });

    describe('when checking if it is an object', () => {
      test('then return false', () => {
        const value = new PropertyDecoratorValue({ type: String });
        expect(value.isMultiClass()).toBeTruthy();
      });
    });

    describe('when checking if it is a function/callback', () => {
      test('then return true', () => {
        const value = new PropertyDecoratorValue(() => 'arbitrary-value');
        expect(value.isCallback()).toBeTruthy();
      });
    });

    describe('when checking if it is an enum', () => {
      test('then return true', () => {
        enum Enum {
          Foo,
          Bar,
        }

        const value = new PropertyDecoratorValue({ enum: Enum });
        expect(value.isEnum()).toBeTruthy();
      });
    });
  });
});
