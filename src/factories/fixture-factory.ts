import faker from 'faker';
import { FixturesCreator } from '../handlers/fixtures-creator';
import { ClassLiteral, ClassType } from '../types/class.type';
import { GeneratorFactoryOptions } from '../types/generator-factory-options.interface';

export class FixtureFactory {
  public static create<T = unknown>(target: ClassType<T>, options: GeneratorFactoryOptions): ClassLiteral<T>[];

  public static create<T = unknown>(target: ClassType<T>): ClassLiteral<T>;

  public static create<T = unknown>(
    target: ClassType<T>,
    options?: GeneratorFactoryOptions
  ): ClassLiteral<T> | ClassLiteral<T>[] {
    const { total = 1, locale = FixturesCreator.DEFAULT_LOCALE } = options || {};

    const factory = new FixturesCreator<T>(faker, locale);

    if (!total || total === 1) {
      return factory.createForTarget(target) as ClassLiteral<T>;
    }

    const objects: ClassLiteral<T>[] = []; // test

    for (let i = 1; i <= total; i++) {
      objects.push(factory.createForTarget(target));
    }

    return objects;
  }
}
