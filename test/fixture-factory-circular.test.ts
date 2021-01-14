import { Fixture } from '../src/decorators/fixture.decorator';
import { FixtureFactory } from '../src/factories/fixture-factory';

describe('Fixture Factory - circular class-type cases', () => {
  describe('With single class circular fixture', () => {
    class Man {
      @Fixture(Man)
      readonly son: Man;
    }

    test('When calling FixtureFactory.create it throws an exception', () => {
      expect(() => FixtureFactory.create<Man>(Man)).toThrowError(
        'Circular class-type fixture detected! Target: Man; Property: son'
      );
    });
  });

  describe('With multiple class circular fixture', () => {
    class AnotherMan {
      @Fixture({ type: AnotherMan, count: 3 })
      readonly sons: AnotherMan[];
    }

    test('When calling FixtureFactory.create it throws an exception', () => {
      expect(() => FixtureFactory.create<AnotherMan>(AnotherMan)).toThrowError(
        'Circular class-type fixture detected! Target: AnotherMan; Property: sons'
      );
    });
  });
});
