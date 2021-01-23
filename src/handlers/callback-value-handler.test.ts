import { CallbackValueHandler } from '../handlers/callback-value-handler';
import { Callback } from '../types/fixture-options.type';

import FakerStatic = Faker.FakerStatic;
import { PropertyDto } from 'src/types/property-dto.interface';

describe('CallbackValueInspector Unit', () => {
  let dto: PropertyDto<Callback>, handler: CallbackValueHandler<Callback>;

  const fakerMock = ({ internet: { email: jest.fn() } } as unknown) as FakerStatic;

  beforeEach(() => {
    dto = {
      type: 'function',
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      value: { name: '' },
      name: 'testPropertyName',
      constructorName: '',
    };
  });

  describe('given a CallbackValueInspector', () => {
    beforeAll(() => {
      handler = new CallbackValueHandler(fakerMock);
    });

    describe("when calling 'shouldHandle' method with type function name and empty constructor name", () => {
      test('then return true', () => {
        const result = handler.shouldHandle(dto);

        expect(result).toBeTruthy();
      });
    });

    describe("when calling 'produceValue' ", () => {
      test('then call the callback function with same faker instance', () => {
        dto.value = jest.fn();
        handler.produceValue(dto);

        expect(dto.value).toHaveBeenCalledTimes(1);
        expect(dto.value).toHaveBeenCalledWith(fakerMock);
      });
    });
  });
});
