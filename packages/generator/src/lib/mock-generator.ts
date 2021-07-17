import { Class, Faker } from '@mockinbird/types';
import { ClassParser } from '@mockinbird/parser';
import { ClassReflector } from '@mockinbird/reflect';
import { MockDecoratorFactoryOptions } from '../types/mock-decorator-factory-options.interface';

export class MockGenerator {
  private static readonly DEFAULT_LOCALE = 'en';

  /**
   * Return an object with all the properties decorated by the 'Mock' Decorator
   *
   * @example
   * class Person { @Mock() name: string }
   * MockGenerator.create(Person) will return an object { name: <random-string> }
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
   * MockGenerator.create(Person, { count: 3, locale: 'es' }) will return an
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
    const { count = 1, locale = this.DEFAULT_LOCALE } = options || {};

    Faker.setLocale(locale);

    const parser = new ClassParser<TClass>(Faker, new ClassReflector());

    if (!count || count === 1) {
      return parser.parse(targetClass);
    }

    const classInstances: TClass[] = [];

    for (let i = 1; i <= count; i++) {
      classInstances.push(parser.parse(targetClass));
    }

    return classInstances;
  }
}
