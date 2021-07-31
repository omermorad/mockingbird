import { Class } from '@mockinbird/types';
import { ClassParser } from '@mockinbird/parser';
import { MockGeneratorOptions } from '../../types/mock-generator-options.interface';

export class MockGenerator {
  private static readonly DEFAULT_LOCALE = 'en';

  public constructor(private readonly classParser: ClassParser) {}

  /**
   * Return an object with all the properties decorated by the 'Mock' Decorator
   *
   * @example
   * class Person { @Mock() name: string }
   * MockGenerator.create(Person) will return an object { name: <random-string> }
   *
   * @param targetClass
   */
  public create<TClass = any>(targetClass: Class<TClass>): TClass;

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
   * @param targetClass
   * @param options
   */
  public create<TClass = any>(targetClass: Class<TClass>, options: MockGeneratorOptions<TClass>): TClass;
  public create<TClass = any>(targetClass: Class<TClass>, options: MockGeneratorOptions<TClass>): TClass[];

  /**
   * Return one or many objects (array) with all the properties decorated
   * by the Mock decorator
   *
   * @param targetClass
   * @param options
   */
  public create<TClass = any>(
    targetClass: Class<TClass>,
    options: MockGeneratorOptions<TClass> = {}
  ): TClass | TClass[] {
    const { count = 1, locale = MockGenerator.DEFAULT_LOCALE, ...config } = options || {};

    this.classParser.setFakerLocale(locale);

    if (count === 1) {
      return this.classParser.parse(targetClass, config);
    }

    const classInstances: TClass[] = [];

    for (let i = 1; i <= count; i++) {
      const parsedClass = this.classParser.parse<TClass>(targetClass, config);
      classInstances.push(parsedClass);
    }

    return classInstances;
  }
}
