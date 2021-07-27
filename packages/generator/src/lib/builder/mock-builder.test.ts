import { ClassReflector } from '@mockinbird/reflect';
import { MockBuilder } from './mock-builder';
import { Faker, ClassParser, Mock } from '../../';
import { MockGenerator } from '../generator/mock-generator';

class Dog {
  @Mock()
  name: string;

  @Mock((faker) => faker.datatype.number(20))
  points: number;

  @Mock((faker) => faker.random.arrayElement(['yes', 'no']))
  isAwesome: 'yes' | 'no';

  @Mock((faker) => faker.datatype.uuid())
  _unique_id_prop_: string;
}

describe('MockBuilder Integration Test', () => {
  let giveMeNewBuilder: () => MockBuilder<Dog>;

  beforeAll(() => {
    const parser = new ClassParser(Faker, new ClassReflector());
    const generator = new MockGenerator(parser);

    giveMeNewBuilder = (): MockBuilder<Dog> => new MockBuilder<Dog>(Dog, generator);
  });

  let builder: MockBuilder<Dog>;

  beforeAll(() => (builder = giveMeNewBuilder()));

  scenario('scenario: override some values permanently', () => {
    given('given I have created a builder and ask to override values', () => {
      beforeAll(() => builder.always.setValues({ points: 10, isAwesome: 'blabla' }));

      when('when I create a single mock of Dog, repeating a few times', () => {
        let mock;

        beforeAll(() => {
          for (let i = 1; i <= 3; i++) {
            mock = builder.one();
          }
        });

        test("then always return a mock with a permanent values (that I've asked to override)", () => {
          expect(mock.points).toBe(10);
          expect(mock.isAwesome).toBe('blabla');
        });
      });

      when('when I create many mocks (of Dog), repeating a few times', () => {
        let mocks;

        beforeAll(() => {
          for (let i = 1; i <= 3; i++) {
            mocks = builder.many(3);
          }
        });

        test("then always return array where mock has permanent values (of the properties I've asked to override)", () => {
          // TODO: Fix this for all the array
          expect(mocks[0].points).toBe(10);
          expect(mocks[0].isAwesome).toBe('blabla');
        });
      });
    });
  });

  scenario('scenario: ignore some values permanently', () => {
    given("given I've created a builder and ask to ignore values permanently", () => {
      beforeAll(() => builder.always.ignore('isAwesome', 'points'));

      when('when I create a single mock of Dog, repeating a few times', () => {
        let mock;

        beforeAll(() => {
          for (let i = 1; i <= 3; i++) {
            mock = builder.one();
          }
        });

        then("then always return a mock without the values I've asked to ignore", () => {
          expect(mock.points).toBeUndefined();
          expect(mock.isAwesome).toBeUndefined();
        });
      });

      when('when I create many mocks (of Dog), repeating a few times', () => {
        let mocks;

        beforeAll(() => {
          for (let i = 1; i <= 3; i++) {
            mocks = builder.many(3);
          }
        });

        test("then always return array where the item has no value (inside the properties I've asked to ignore)", () => {
          const itemIsUndefined = (key) => (item) => typeof item[key] === 'undefined';

          expect(mocks.every(itemIsUndefined('points'))).toBeTruthy();
          expect(mocks.every(itemIsUndefined('isAwesome'))).toBeTruthy();
        });
      });

      and('and now I want to ignore a property only once', () => {
        let mock;

        describe('when creating a new single mock', () => {
          beforeAll(() => (mock = builder.ignoreOnce('name').one()));

          test('then ignore the permanent keys as well as the key to ignore once', () => {
            expect(mock.name).toBeUndefined();
          });

          test("then do not ignore the key I've asked to ignore once", () => {
            mock = builder.one();
            expect(mock.name).not.toBeUndefined();
          });
        });
      });
    });
  });

  scenario('scenario: ask for plain object', () => {
    given('given I have created a builder (with not settings)', () => {
      beforeAll(() => (builder = giveMeNewBuilder()));

      when('when I ask for a plain object', () => {
        and('and I want to create one single mock', () => {
          let mock;

          test('then return a plain object (and not an actual instance)', () => {
            mock = builder.plain().one();
            expect(mock).not.toBeInstanceOf(Dog);
            expect(mock).toBeInstanceOf(Object);
          });

          test('then return an instance of Dog again', () => {
            mock = builder.one();
            expect(mock).toBeInstanceOf(Dog);
          });
        });

        and('and I want to create many mocks', () => {
          let mocks;
          const itemIsInstanceOfDog = (item) => item.constructor.name === 'Dog';

          test('then return array of plain objects (and not an actual instances)', () => {
            mocks = builder.plain().many(3);
            expect(mocks.every(itemIsInstanceOfDog)).toBeFalsy();
          });

          test('then return array of instances of Dog again', () => {
            mocks = builder.many(3);
            expect(mocks.every(itemIsInstanceOfDog)).toBeTruthy();
          });
        });
      });
    });
  });

  /*
    describe('when calling one method', () => {
      describe('and no previous calls for setting a locale has been executed', () => {
        let mock;

        beforeAll(() => {
          const dog = new Dog();
          dog._unique_id_prop_ = '123';

          mockGeneratorMock.create.mockReturnValue(dog);
          mock = builder.one();
        });

        test('then call create with the same target class and the default locale', () => {
          expect(mockGeneratorMock.create).toHaveBeenCalledWith(Dog, { locale: 'en' });
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
          expect(mockGeneratorMock.create).toHaveBeenCalledWith(Dog, { locale: 'test' });
        });
      });

      describe('and there was a previous call for setting the mock as a plain mock', () => {
        beforeAll(() => {
          builder.plain();

          const dog = new Dog();
          dog._unique_id_prop_ = '123';

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

          builder.plain();
          mockGeneratorMock.create.mockReturnValueOnce([new Dog(), new Dog(), new Dog()]);
        });

        test('then return plain objects and not instances of the class', () => {
          const notAnInstanceOfDog = (obj) => !(obj instanceof Dog);

          expect(builder.many(3).every(notAnInstanceOfDog)).toBeTruthy();
        });
      });
    });
     */
});
