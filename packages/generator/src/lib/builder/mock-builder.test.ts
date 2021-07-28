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

const itemIsUndefinedInKey = (key) => (item) => typeof item[key] === 'undefined';
const itemIsDefinedInKey = (key) => (item) => typeof item[key] !== 'undefined';

/**
 * This test is written with strict BDD using jest-gherkin
 * the word prop stands for a 'property', as well as 'props' which stands for 'properties'
 */

describe('MockBuilder Integration Test', () => {
  let createNewBuilder: () => MockBuilder<Dog>;

  beforeAll(() => {
    const parser = new ClassParser(Faker, new ClassReflector());
    const generator = new MockGenerator(parser);

    createNewBuilder = (): MockBuilder<Dog> => new MockBuilder<Dog>(Dog, generator);
  });

  let builder: MockBuilder<Dog>;

  scenario('override/mock some values permanently and spontaneously', () => {
    beforeAll(() => {
      builder = createNewBuilder();
    });

    given('a builder which is configured to override/mock some values permanently', () => {
      beforeAll(() => builder.mutate.setValues({ points: 10, isAwesome: 'blabla' }));

      when('I create a single mock of Dog, and I repeat a few times', () => {
        let mock;

        beforeAll(() => {
          for (let i = 1; i <= 3; i++) {
            mock = builder.one();
          }
        });

        then("return a mock with the permanent values that I've asked before", () => {
          expect(mock.points).toBe(10);
          expect(mock.isAwesome).toBe('blabla');
        });

        and('I want to create a new mock but to override a value only once', () => {
          beforeAll(() => (mock = builder.mutateOnce('name', 'from-mock-once').one()));

          then('override/mock the permanent values alongside the spontaneous value', () => {
            expect(mock.name).toBe('from-mock-once');
          });

          describe('and when I repeat again', () => {
            beforeAll(() => (mock = builder.one()));

            then("do not apply the spontaneous mocking I've set before", () => {
              expect(mock.name).not.toBe('from-mock-once');
            });
          });
        });
      });

      when('I create many mocks of Dog, and I repeat a few times', () => {
        let mocks;

        beforeAll(() => {
          for (let i = 1; i <= 3; i++) {
            mocks = builder.many(3);
          }
        });

        then(
          "mutate return an array, where each item has the same permanent values of the props I've asked to override",
          () => {
            const itemHasSameValue = (key, value) => (item) => item[key] === value;

            expect(mocks.every(itemHasSameValue('points', 10))).toBeTruthy();
            expect(mocks.every(itemHasSameValue('isAwesome', 'blabla'))).toBeTruthy();
          }
        );
      });
    });
  });

  scenario('ignore some values permanently and spontaneously', () => {
    beforeAll(() => {
      builder = createNewBuilder();
    });

    given("I've created a builder and ask to ignore some values permanently", () => {
      beforeAll(() => builder.mutate.ignore('isAwesome', 'points'));

      when('I create a single mock of Dog, repeating a few times', () => {
        let mock;

        beforeAll(() => {
          for (let i = 1; i <= 3; i++) {
            mock = builder.one();
          }
        });

        then("mutate return a mock without no values on props I've asked to ignore", () => {
          expect(mock.points).toBeUndefined();
          expect(mock.isAwesome).toBeUndefined();
        });
      });

      when('I create many mocks of Dog, repeating a few times', () => {
        let mocks;

        beforeAll(() => {
          for (let i = 1; i <= 3; i++) {
            mocks = builder.many(3);
          }
        });

        then("mutate return an array where the prop I've asked to ignore has no value", () => {
          expect(mocks.every(itemIsUndefinedInKey('points'))).toBeTruthy();
          expect(mocks.every(itemIsUndefinedInKey('isAwesome'))).toBeTruthy();
        });
      });

      when('I want to ignore a prop only once (alongside the permanent props)', () => {
        let mock;

        when('I create a new single mock of Dog', () => {
          beforeAll(() => (mock = builder.ignoreOnce('name').one()));

          then("ignore the permanent keys as well as the key I've asked to ignore once", () => {
            expect(mock.name).toBeUndefined();
          });

          describe('and when I ask to create a mock again', () => {
            then("do not ignore the key I've asked to ignore only once", () => {
              mock = builder.one();
              expect(mock.name).not.toBeUndefined();
            });
          });
        });

        when('I create many mocks of the same class, Dog', () => {
          let mocks;

          beforeAll(() => (mocks = builder.ignoreOnce('name').many(3)));

          then("return an array where each item has no value in the prop 'name'", () => {
            expect(mocks.every(itemIsUndefinedInKey('name'))).toBeTruthy();
          });

          describe('and now I want to create some more mocks again', () => {
            beforeAll(() => (mocks = builder.many(3)));

            then("do not ignore the key I've asked to ignore only once", () => {
              expect(mocks.every(itemIsDefinedInKey('name'))).toBeTruthy();
            });
          });
        });
      });
    });
  });

  scenario('ask for plain object', () => {
    beforeAll(() => {
      builder = createNewBuilder();
    });

    given('I have created a builder (with no settings)', () => {
      beforeAll(() => (builder = createNewBuilder()));

      when('I ask for a plain object', () => {
        and('I want to create one single mock', () => {
          let mock;

          then('return a plain object (and not an actual instance)', () => {
            mock = builder.plain().one();

            expect(mock).not.toBeInstanceOf(Dog);
            expect(mock).toBeInstanceOf(Object);
          });

          then('return an instance of Dog again', () => {
            mock = builder.one();

            expect(mock).toBeInstanceOf(Dog);
          });
        });

        and('I want to create many mocks', () => {
          let mocks;
          const itemIsInstanceOfDog = (item) => item.constructor.name === 'Dog';

          then('return array of plain objects (and not an actual instances)', () => {
            mocks = builder.plain().many(3);
            expect(mocks.every(itemIsInstanceOfDog)).toBeFalsy();
          });

          then('return array of instances of Dog again', () => {
            mocks = builder.many(3);
            expect(mocks.every(itemIsInstanceOfDog)).toBeTruthy();
          });
        });
      });
    });
  });
});
