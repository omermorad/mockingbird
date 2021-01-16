import faker from 'faker';
import { ClassProcessor } from '../handlers/class-processor';
import { ClassLiteral, ClassType } from '../types/class.type';
import { FixtureFactoryOptions } from '../types';

export class FixtureFactory {
  public static create<T = unknown>(target: ClassType<T>, options: FixtureFactoryOptions): ClassLiteral<T>[];

  public static create<T = unknown>(target: ClassType<T>): ClassLiteral<T>;

  public static create<T = unknown>(
    target: ClassType<T>,
    options?: FixtureFactoryOptions
  ): ClassLiteral<T> | ClassLiteral<T>[] {
    const { total = 1, locale = ClassProcessor.DEFAULT_LOCALE } = options || {};

    const factory = new ClassProcessor<T>(faker, locale);

    if (!total || total === 1) {
      return factory.process(target) as ClassLiteral<T>;
    }

    const objects: ClassLiteral<T>[] = []; // test

    for (let i = 1; i <= total; i++) {
      objects.push(factory.process(target));
    }

    return objects;
  }
}
