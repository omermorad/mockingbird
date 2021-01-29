import * as reflectModule from '@plumier/reflect';
import { ClassReflection } from '@plumier/reflect';
import { ClassProcessor } from './class-processor';
import { mocked } from 'ts-jest/utils';
import { Fixture } from './decorators/fixture.decorator';
import { ClassReflector } from './class-reflector';
import FakerStatic = Faker.FakerStatic;

const fakerMock = ({
  setLocale: jest.fn(),
} as unknown) as FakerStatic;

const factory = new ClassProcessor(fakerMock, new ClassReflector(), 'en');
const reflectSpy = jest.spyOn(reflectModule, 'default');

describe('ClassProcessor', () => {
  let reflectionMock;

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

  beforeEach(() => {
    reflectionMock = JSON.parse(JSON.stringify(reflection));
  });

  test('Should throw error if target parameter is not a class', () => {
    expect(() => factory.process(undefined)).toThrow(`Target class 'undefined' is 'undefined'`);
  });

  test('faker.setLocale should be called with the passed locale', () => {
    const setLocaleMock = mocked(fakerMock.setLocale).mock.calls;

    expect(setLocaleMock).toHaveLength(1);
    expect(setLocaleMock[0][0]).toEqual('en');
  });

  /*
  test('Should throw an error if no target was passed', () => {
    delete reflectionMock.properties;
    reflectSpy.mockImplementationOnce(() => reflectionMock);

    const res = factory.process(Dog);

    expect(res).toEqual(undefined);
  });
   */

  test('Should return specific decoratorValue passed from fixture', () => {
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
