import faker from 'faker';
import { ClassProcessor } from '../handlers/class-processor';
import { ClassLiteral, ClassType } from '../types/class.type';
import { FixtureFactoryOptions } from '../types';

export class FixtureFactory {
  /**
   * Return an object with all the properties decorated by the 'Fixture' Decorator
   *
   * @example
   * class Person { @Fixture() name: string }
   * FixtureFactory.create(Person) will return an object { name: <random-string> }
   *
   * @param target
   */
  public static create<T = unknown>(target: ClassType<T>): ClassLiteral<T>;

  /**
   * Return an array of objects with all the properties decorated by the
   * 'Fixture' Decorator (if 'count' is greater than 1)
   *
   * @example
   * class Person { @Fixture() name: string }
   * FixtureFactory.create(Person, { count: 3, locale: 'es' }) will return an
   * array of objects [{ name: <random-string> }, { name: <random-string> }, { name: <random-string> }]
   *
   * Passing a 'locale' property will set a different locale for faker calls
   * The default locale is 'en' (english)
   *
   * @param target
   * @param options
   */
  public static create<T = unknown>(target: ClassType<T>, options: FixtureFactoryOptions): ClassLiteral<T>[];

  /**
   * Return one or many objects (array) with all the properties decorated by the Fixture decorator
   *
   * @param target
   * @param options
   */
  public static create<T = unknown>(
    target: ClassType<T>,
    options?: FixtureFactoryOptions
  ): ClassLiteral<T> | ClassLiteral<T>[] {
    const { count = 1, locale = ClassProcessor.DEFAULT_LOCALE } = options || {};

    const factory = new ClassProcessor<T>(faker, locale);

    if (!count || count === 1) {
      return factory.process(target) as ClassLiteral<T>;
    }

    const objects: ClassLiteral<T>[] = []; // test

    for (let i = 1; i <= count; i++) {
      objects.push(factory.process(target));
    }

    return objects;
  }
}
