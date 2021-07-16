import { Class, Faker } from '@mockinbird/types';
import { ClassParser } from '@mockinbird/parser';
import { ClassReflector } from '@mockinbird/reflect';
import { MockDecoratorFactoryOptions } from '../../types/mock-decorator-factory-options.interface';

export class MockGenerator {
  /**
   * Return an object with all the properties decorated by the 'Mock' Decorator
   *
   * @example
   * class Person { @Mock() name: string }
   * MockFactory.create(Person) will return an object { name: <random-string> }
   *
   * @param target
   */
  public static create<TClass = any>(target: Class<TClass>): TClass;

  /**
   * Return an array of objects with all the properties decorated by the
   * 'Mock' Decorator (if 'count' is greater than 1)
   *
   * @example
   * class Person { @Mock() name: string }
   * MockFactory.create(Person, { count: 3, locale: 'es' }) will return an
   * array of objects [{ name: <random-string> }, { name: <random-string> },
   * { name: <random-string> }]
   *
   * Passing a 'locale' property will set a different locale for faker calls
   * The default locale is 'en' (english)
   *
   * @param target
   * @param options
   */
  public static create<TClass = any>(target: Class<TClass>, options: MockDecoratorFactoryOptions): TClass[];

  /**
   * Return one or many objects (array) with all the properties decorated
   * by the Mock decorator
   *
   * @param targetClass
   * @param options
   */
  public static create<TClass = any>(
    targetClass: Class<TClass>,
    options?: MockDecoratorFactoryOptions
  ): TClass | TClass[] {
    const { count = 1, locale = ClassParser.DEFAULT_LOCALE } = options || {};
    const processor = new ClassParser<TClass>(Faker, new ClassReflector(), locale);

    if (!count || count === 1) {
      return processor.parse(targetClass);
    }

    const classInstances: TClass[] = [];

    for (let i = 1; i <= count; i++) {
      classInstances.push(processor.parse(targetClass));
    }

    return classInstances;
  }
}
