import { ClassProcessor } from './class-processor';
import * as faker from 'faker';
import { mocked } from 'ts-jest/utils';
import { Fixture } from '../decorators';
import * as reflectModule from '@plumier/reflect';
import { ClassReflection } from '@plumier/reflect';

jest.mock('faker');

const factory = new ClassProcessor(faker, 'en');

const reflectSpy = jest.spyOn(reflectModule, 'default');

describe('createForTarget', () => {
  class Dog {
    @Fixture()
    readonly name: string;

    @Fixture()
    readonly age: number;
  }

  test('Should throw error if target parameter is not a class', () => {
    expect(() => factory.process(undefined)).toThrow(`Target class 'undefined' is 'undefined'`);
  });

  test('faker.setLocale should be called with the passed locale', () => {
    const setLocaleMock = mocked(faker.setLocale).mock.calls;
    expect(setLocaleMock).toHaveLength(1);
    expect(setLocaleMock[0][0]).toEqual('en');
  });

  test.skip('Should throw an error if no target was passed', () => {
    const reflectionMock: ClassReflection = {
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

    reflectSpy.mockImplementationOnce(() => reflectionMock);
    const res = factory.process(Dog);
  });
});
