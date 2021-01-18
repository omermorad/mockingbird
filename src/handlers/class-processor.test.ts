import { ClassProcessor } from './class-processor';
import * as faker from 'faker';
import { mocked } from 'ts-jest/utils';
import { Fixture } from '../decorators';
import * as reflectModule from '@plumier/reflect';
import { ClassReflection } from '@plumier/reflect';

jest.mock('faker');

const factory = new ClassProcessor(faker, 'en');

const reflectSpy = jest.spyOn(reflectModule, 'default');

class Dog {
  @Fixture()
  readonly name: string;

  @Fixture()
  readonly age: number;
}

const reflection: ClassReflection = {
  kind: 'Class',
  name: 'Dog',
  decorators: [],
  methods: [],
  properties: [],
  ctor: {
    kind: 'Constructor',
    name: 'constructor',
    parameters: [],
  },
  typeClassification: 'Class',
  super: Dog,
  type: Dog,
};

describe('ClassProcessor', () => {
  let reflectionMock;

  beforeEach(() => {
    reflectionMock = JSON.parse(JSON.stringify(reflection));
  });

  test('Should throw error if target parameter is not a class', () => {
    expect(() => factory.process(undefined)).toThrow(`Target class 'undefined' is 'undefined'`);
  });

  test('faker.setLocale should be called with the passed locale', () => {
    const setLocaleMock = mocked(faker.setLocale).mock.calls;
    expect(setLocaleMock).toHaveLength(1);
    expect(setLocaleMock[0][0]).toEqual('en');
  });

  test('Should throw an error if no target was passed', () => {
    delete reflectionMock.properties;
    reflectSpy.mockImplementationOnce(() => reflectionMock);

    const res = factory.process(Dog);

    expect(res).toEqual(undefined);
  });

  test('Should return specific value passed from fixture', () => {
    class AnotherDog {
      @Fixture('doggo')
      name: string;
    }

    reflectionMock.properties = [
      {
        kind: 'Property',
        name: 'name',
        type: {
          name: 'String',
        },
        decorators: [
          {
            type: 'Fixture',
            value: 'doggo',
          },
        ],
        typeClassification: 'Primitive',
      },
    ];

    reflectSpy.mockImplementationOnce(() => reflectionMock);
    const result = factory.process(AnotherDog);

    expect(result).toEqual({ name: 'doggo' });
  });
});
