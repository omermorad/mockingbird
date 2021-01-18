import { PrimitiveValueHandler } from './primitive-value-handler';
import { ClassProcessor } from '../class-processor';
import faker from 'faker';

jest.mock('faker', () => {
  return {
    random: {
      alpha: jest.fn(),
      number: jest.fn(),
      boolean: jest.fn(),
      alphaNumeric: jest.fn(),
    },
    date: {
      recent: jest.fn(),
    },
    setLocale: () => jest.fn(),
  };
});

const valueHandler = new PrimitiveValueHandler();

describe('PrimitiveValueHandler', () => {
  let dto;
  beforeEach(() => {
    dto = {
      type: 'string',
      value: 'TestStr',
      name: 'name',
    };
  });

  test('Should return value if primitive value passed', () => {
    dto.value = 'TestStr';
    const result = valueHandler.handle(dto, new ClassProcessor(faker, 'en'), faker);
    expect(result).toEqual('TestStr');
  });

  test('Should return faker random string if there is no value and ctor is a string', () => {
    dto.value = false;
    dto.constructorName = 'String';

    valueHandler.handle(dto, new ClassProcessor(faker, 'en'), faker);
    expect(faker.random.alpha).toHaveBeenCalledTimes(1);
  });

  test('Should return faker random string if there is no value and ctor is a number', () => {
    dto.value = false;
    dto.constructorName = 'Number';

    valueHandler.handle(dto, new ClassProcessor(faker, 'en'), faker);
    expect(faker.random.number).toHaveBeenCalledTimes(1);
  });

  test('Should return faker random Boolean if there is no value and ctor is a Boolean', () => {
    dto.value = false;
    dto.constructorName = 'Boolean';

    valueHandler.handle(dto, new ClassProcessor(faker, 'en'), faker);
    expect(faker.random.boolean).toHaveBeenCalledTimes(1);
  });

  test('Should return faker random Date if there is no value and ctor is Date', () => {
    dto.value = false;
    dto.constructorName = 'Date';

    valueHandler.handle(dto, new ClassProcessor(faker, 'en'), faker);
    expect(faker.random.boolean).toHaveBeenCalledTimes(1);
  });

  test('Should return faker random alphaNumeric if constructorName is not a primitive', () => {
    dto.value = false;
    dto.constructorName = 'notPrimitive';

    valueHandler.handle(dto, new ClassProcessor(faker, 'en'), faker);
    expect(faker.random.alphaNumeric).toHaveBeenCalledTimes(1);
  });
});
