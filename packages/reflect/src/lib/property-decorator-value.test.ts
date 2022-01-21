import { PropertyDecoratorValue } from './property-decorator-value';

describe('PropertyDecoratorValue Unit', () => {
  describe('given a PropertyDecoratorValue with a string value', () => {
    describe('when checking if it is an object', () => {
      test('then return true', () => {
        const value = new PropertyDecoratorValue({ value: {} });
        expect(value.isObject()).toBeTruthy();
      });
    });

    describe('array of classes', () => {
      describe('when passing object with lazy class and options', () => {
        test('then return true', () => {
          const value = new PropertyDecoratorValue({ value: () => class A {}, options: { count: 3 } });
          expect(value.isArrayOfClasses()).toBeTruthy();
        });
      });

      describe('when passing object with lazy class and options', () => {
        test('then return true', () => {
          const value = new PropertyDecoratorValue({ value: null });
          expect(value.isArrayOfClasses()).toBeFalsy();
        });
      });
    });

    describe('when checking if it is an array of classes with primitive', () => {
      test('then return true', () => {
        const value = new PropertyDecoratorValue({ value: () => String, options: { count: 3 } });
        expect(value.isArrayOfClasses()).toBeTruthy();
      });
    });

    describe('when checking if it is a function', () => {
      test('then return true', () => {
        const value = new PropertyDecoratorValue({ value: () => 'arbitrary-value' });
        expect(value.isFunction()).toBeTruthy();
      });
    });

    describe('when checking if it is a regex', () => {
      test('then return true', () => {
        const value = new PropertyDecoratorValue({ value: /^123$/ });
        expect(value.isRegex()).toBeTruthy();
      });
    });

    describe('enum check', () => {
      when('passing a valid enum signature', () => {
        test('then return true', () => {
          enum Enum {
            Foo,
            Bar,
          }

          const value = new PropertyDecoratorValue({ value: { enum: () => Enum } });
          expect(value.isEnum()).toBeTruthy();
        });
      });

      when('passing invalid enum signature', () => {
        test('then return true', () => {
          enum Enum {
            Foo,
            Bar,
          }

          let value;

          value = new PropertyDecoratorValue({ value: { invalid: () => Enum } });
          expect(value.isEnum()).toBeFalsy();

          value = new PropertyDecoratorValue({ value: undefined });
          expect(value.isEnum()).toBeFalsy();
        });
      });
    });
  });
});
