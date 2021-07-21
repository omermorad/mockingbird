import { MockBuilder } from './mock-builder';

describe('MockBuilder Test', () => {
  describe('given a MockBuilder', () => {
    let builder: MockBuilder;

    const mockGeneratorMock = { create: jest.fn() };

    class Dog {
      _unique_id: string;
    }

    describe('when calling one method', () => {
      beforeAll(() => {
        builder = new MockBuilder(Dog, mockGeneratorMock as any);
      });

      describe('and no previous calls for setting a locale has been executed', () => {
        let mock;

        beforeAll(() => {
          const dog = new Dog();
          dog._unique_id = '123';

          mockGeneratorMock.create.mockReturnValue(dog);
          mock = builder.one();
        });

        test('then call create with the same target class and the default locale', () => {
          expect(mockGeneratorMock.create).toHaveBeenCalledWith(Dog, 'en');
        });

        describe('and it was not ask for a plain object', () => {
          test('then return an instance of the class', () => {
            expect(mock).toBeInstanceOf(Dog);
          });
        });
      });

      describe('and there was a previous call for setting a locale', () => {
        test('then call create with the same target class and the preset locale', () => {
          builder.setLocale('test').one();
          expect(mockGeneratorMock.create).toHaveBeenCalledWith(Dog, 'test');
        });
      });

      describe('and there was a previous call for setting the mock as a plain mock', () => {
        beforeAll(() => {
          builder.toPlain();

          const dog = new Dog();
          dog._unique_id = '123';

          mockGeneratorMock.create.mockReturnValue(dog);
        });

        test('then return a plain object and not an instance of the class', () => {
          const result = builder.one();

          expect(result).not.toBeInstanceOf(Dog);
          expect(result).toHaveProperty('_unique_id');
        });
      });
    });

    describe('when calling many method', () => {
      beforeAll(() => {
        builder = new MockBuilder(Dog, mockGeneratorMock as any);
      });

      describe('and no previous calls for setting a locale has been executed', () => {
        test('then call create with the same target class, the default locale and count', () => {
          builder.many(3);
          expect(mockGeneratorMock.create).toHaveBeenCalledWith(Dog, { locale: 'en', count: 3 });
        });
      });

      describe('and there was a previous call for setting a locale', () => {
        test('then call create with the same target class and the preset locale', () => {
          builder.setLocale('test').many(4);
          expect(mockGeneratorMock.create).toHaveBeenCalledWith(Dog, { locale: 'test', count: 4 });
        });
      });

      describe('and there was a previous call for setting the mock as a plain mock', () => {
        beforeAll(() => {
          builder = new MockBuilder(Dog, mockGeneratorMock as any);

          builder.toPlain();
          mockGeneratorMock.create.mockReturnValueOnce([new Dog(), new Dog(), new Dog()]);
        });

        test('then return plain objects and not instances of the class', () => {
          const notAnInstanceOfDog = (obj) => !(obj instanceof Dog);

          expect(builder.many(3).every(notAnInstanceOfDog)).toBeTruthy();
        });
      });
    });
  });
});
