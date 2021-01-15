import { Fixture } from '../../src/decorators/fixture.decorator';
import { FixtureFactory } from '../../src/factories/fixture-factory';

enum Activity {
  VeryActive,
  Active,
  NotActive,
}

describe('Fixture Factory - Snapshot test', () => {
  describe('Absolute values', () => {
    it('should use the actual strait value from the decorator', () => {
      class Dummy {
        @Fixture('Johnny Boy')
        name: string;

        @Fixture(1234)
        num: number;

        @Fixture(true)
        binary: boolean;

        @Fixture(new Date('01/01/1970'))
        date: Date;
      }

      const result = FixtureFactory.create(Dummy);
      expect(result).toMatchSnapshot();
    });
  });
});
