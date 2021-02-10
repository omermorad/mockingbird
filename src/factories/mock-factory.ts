import faker from 'faker';
import { ClassProcessor } from '../class-processor';
import { ClassLiteral, Class } from '../types/mock-options.type';
import { MockDecoratorFactoryOptions } from '../types';
import { ClassReflector } from '../class-reflector';

export class MockFactory {
  /**
   * Return an object with all the properties decorated by the 'Mock' Decorator
   *
   * @example
   * class Person { @Mock() name: string }
   * MockFactory.create(Person) will return an object { name: <random-string> }
   *
   * @param target
   */
  public static create<TClass extends any = any>(target: Class<TClass>): ClassLiteral<TClass>;

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
  public static create<TClass extends any = any>(
    target: Class<TClass>,
    options: MockDecoratorFactoryOptions
  ): ClassLiteral<TClass>[];

  /**
   * Return one or many objects (array) with all the properties decorated
   * by the Mock decorator
   *
   * @param target
   * @param options
   */
  public static create<TClass extends any = any>(
    target: Class<TClass>,
    options?: MockDecoratorFactoryOptions
  ): ClassLiteral<TClass> | ClassLiteral<TClass>[] {
    const { count = 1, locale = ClassProcessor.DEFAULT_LOCALE } = options || {};

    const factory = new ClassProcessor<TClass>(faker, new ClassReflector(), locale);

    if (!count || count === 1) {
      return factory.process(target) as ClassLiteral<TClass>;
    }

    const objects: ClassLiteral<TClass>[] = [];

    for (let i = 1; i <= count; i++) {
      objects.push(factory.process(target));
    }

    return objects;
  }
}
