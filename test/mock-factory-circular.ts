import { Mock } from '../src/decorators/mock.decorator';
import { FixtureFactory } from '../src/factories/mock-factory';

describe('Mock Factory - circular class-type', () => {
  describe('with single class circular mock', () => {
    class Man {
      @Mock(Man)
      readonly son: Man;
    }

    test('when calling FixtureFactory.create it throws an exception', () => {
      expect(() => FixtureFactory.create<Man>(Man)).toThrowError(
        'Circular class-type mock detected! Target: Man; Property: son'
      );
    });
  });

  describe('with multiple class circular mock', () => {
    class AnotherMan {
      @Mock({ type: AnotherMan, count: 3 })
      readonly sons: AnotherMan[];
    }

    test('When calling FixtureFactory.create it throws an exception', () => {
      expect(() => FixtureFactory.create<AnotherMan>(AnotherMan)).toThrowError(
        'Circular class-type mock detected! Target: AnotherMan; Property: sons'
      );
    });
  });
});
