import { ClassReflector } from './class-reflector';
import { Fixture } from './decorators/fixture.decorator';
import { ClassReflectionDto } from './types/class-reflection-dto.type';

describe('ClassReflector', () => {
  let reflector: ClassReflector;

  class EmptyClass {}

  class TestClass {
    @Fixture('Foo')
    fooer: string;

    @Fixture('Bar')
    barer: string;
  }

  describe('Given a ClassReflector', () => {
    beforeAll(() => {
      reflector = new ClassReflector();
    });

    describe("when calling 'reflectClass'", () => {
      describe('and there are no related decorators on any of the properties', () => {
        test('then return empty array of properties', () => {
          expect(reflector.reflectClass(EmptyClass)).toHaveLength(0);
        });
      });

      describe('and there are some related decorators in the class', () => {
        let classReflection: ClassReflectionDto;

        beforeAll(() => {
          classReflection = reflector.reflectClass(TestClass);
        });

        test('then return an array of properties which the length is the number of decorators', () => {
          expect(classReflection).toBeInstanceOf(Array);
          expect(classReflection).toHaveLength(2);
        });

        test('then create a property dto for each of the properties', () => {
          expect(Object.keys(classReflection[0])).toEqual(['type', 'value', 'name', 'constructorName']);
        });

        test('then register the class in the reflected classes storage', () => {
          expect(ClassReflector.REFLECTED_CLASSES).toHaveProperty(TestClass.name);
        });
      });
    });
  });
});
