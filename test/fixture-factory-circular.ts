import { Fixture } from '../src/decorators/fixture.decorator';
import { FixtureFactory } from '../src/factories/fixture-factory';

describe('Fixture Factory - circular class-type', () => {
  describe('with single class circular fixture', () => {
    class Man {
      @Fixture(Man)
      readonly son: Man;
    }

    test('when calling FixtureFactory.create it throws an exception', () => {
      expect(() => FixtureFactory.create<Man>(Man)).toThrowError(
        'Circular class-type fixture detected! Target: Man; PropertyInterface: son'
      );
    });
  });

  describe('with multiple class circular fixture', () => {
    class AnotherMan {
      @Fixture({ type: AnotherMan, count: 3 })
      readonly sons: AnotherMan[];
    }

    test('When calling FixtureFactory.create it throws an exception', () => {
      expect(() => FixtureFactory.create<AnotherMan>(AnotherMan)).toThrowError(
        'Circular class-type fixture detected! Target: AnotherMan; PropertyInterface: sons'
      );
    });
  });
});
