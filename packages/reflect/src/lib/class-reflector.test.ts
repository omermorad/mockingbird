import { ClassReflector } from './class-reflector';
import { Mock } from '../decorators';
import { ClassReflectionDto } from '../types/class-reflection-dto.type';

describe('ClassReflector', () => {
  let reflector: ClassReflector;

  class EmptyClass {}

  class TestClass {
    @Mock('Foo')
    fooer: string;

    @Mock('Bar')
    barer: string;
  }

  describe('given a ClassReflector', () => {
    beforeAll(() => {
      reflector = new ClassReflector();
    });

    describe("when calling 'reflectClass'", () => {
      describe('and there are no mock decorators on any of the properties', () => {
        test('then return an empty array of properties', () => {
          expect(reflector.reflectClass(EmptyClass)).toHaveLength(0);
        });
      });

      describe('and the some of the properties in the class are decorated with mock decorator', () => {
        let classReflection: ClassReflectionDto;

        beforeAll(() => {
          classReflection = reflector.reflectClass(TestClass);
        });

        test('then return an array of properties which the length is the number of decorators', () => {
          expect(classReflection).toBeInstanceOf(Array);
          expect(classReflection).toHaveLength(2);
        });

        test('then create a property dto for each of the properties', () => {
          const reflectedClassKeys = Object.keys(classReflection[0]);
          expect(reflectedClassKeys).toEqual(['name', 'constructorName', 'decoratorValue']);
        });

        test('then register the class in the reflected classes storage', () => {
          expect(ClassReflector.REFLECTED_CLASSES).toHaveProperty(TestClass.name);
        });

        describe('and the class has been already reflected once before', () => {
          test('then return the dto of the first class with the name that has been parsed', () => {
            class TestClass {
              @Mock() someNewProperty: string;
            }

            const result = reflector.reflectClass(TestClass);
            expect(result).not.toHaveProperty('someNewProperty');
          });
        });
      });
    });
  });
});
