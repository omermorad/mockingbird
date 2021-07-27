import { MockProducer } from './mock-producer';
import Mocked = jest.Mocked;

describe('given a mock producer', () => {
  class Dog {
    name: string;
    points: number;
  }

  class ProducerTest<T> extends MockProducer<T> {
    constructor(targetClass, mockGenerator) {
      super(targetClass, mockGenerator);
    }
  }

  let producer: ProducerTest<Dog>;
  const generator = { create: jest.fn() } as Mocked<any>;

  describe('when I want to permanently ignore some of the properties (keys)', () => {
    describe('and I create either a single or a multi mock from the target class', () => {
      describe('specifically creating a single mock few times', () => {
        beforeAll(() => {
          producer = new ProducerTest<Dog>(Dog, generator);
          producer.permanentIgnoreKeys('points');

          for (let count = 1; count <= 3; count++) {
            producer.createOne();
          }
        });

        test('then always call the mock generator with the keys I have asked to ignore', () => {
          expect(generator.create).toHaveBeenLastCalledWith(Dog, {
            ignore: ['points'],
            locale: expect.any(String),
            overrides: expect.any(Object),
          });
        });

        describe('and I add some new keys to ignore using an extra argument', () => {
          beforeAll(() => {
            producer = new ProducerTest<Dog>(Dog, generator);
            producer.permanentIgnoreKeys('points');

            producer.createOne({ ignore: ['name'] });
          });

          test('then call the mock generator with the combination of the keys', () => {
            expect(generator.create).toHaveBeenCalledWith(Dog, {
              ignore: ['points', 'name'],
              locale: expect.any(String),
              overrides: expect.any(Object),
            });
          });

          test('then call the mock generator only with the permanent keys when I call it again', () => {
            producer.createOne();

            expect(generator.create).toHaveBeenCalledWith(Dog, {
              ignore: ['points'],
              locale: expect.any(String),
              overrides: expect.any(Object),
            });
          });
        });
      });

      describe('specifically creating a multi mock', () => {
        beforeAll(() => producer.createMany(3));

        test('then always call the mock generator with the keys I have asked to ignore', () => {
          expect(generator.create).toHaveBeenCalledWith(Dog, {
            locale: expect.any(String),
            count: expect.any(Number),
            overrides: expect.any(Object),
            ignore: ['points'],
          });
        });

        describe('and I combine some new keys to ignore using an extra argument', () => {
          beforeAll(() => producer.createMany(3, { ignore: ['name'] }));

          test('then call the mock generator with the combination of the keys', () => {
            expect(generator.create).toHaveBeenCalledWith(Dog, {
              locale: expect.any(String),
              count: expect.any(Number),
              overrides: expect.any(Object),
              ignore: ['points', 'name'],
            });
          });
        });
      });
    });
  });

  describe('when I want to permanently override some of the properties/keys', () => {
    beforeAll(() => producer.permanentOverrides({ points: 10 }));

    describe('and I create either a single or a multi mock from the target class', () => {
      describe('specifically creating a single mock', () => {
        beforeAll(() => producer.createOne());

        test('then always call the mock generator with the keys I have asked to override', () => {
          expect(generator.create).toHaveBeenCalledWith(Dog, {
            ignore: expect.any(Array),
            locale: expect.any(String),
            overrides: { points: 10 },
          });
        });
      });
    });
  });
});
