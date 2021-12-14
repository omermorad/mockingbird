import { Class } from '@mockingbird/common';
import { Keys, Mutations } from './types';
import { mockGenerator } from '@mockingbird/parser';

interface ExtraKeys<TClass> {
  omit?: Keys<TClass>;
  pick?: Keys<TClass>;
  mutations?: Mutations<TClass>;
  plain?: boolean;
}

export class MockProducer<TClass = any> {
  protected constructor(protected readonly targetClass: Class<TClass>) {}

  protected createMany(count: number, config: ExtraKeys<TClass> = {}): TClass[] {
    const { mutations = {}, plain = false, pick = [], omit = [] } = config;

    return mockGenerator.generate(this.targetClass, {
      mutations,
      pick,
      omit,
      plain,
      count,
    }) as unknown as TClass[];
  }

  protected createOne(config: ExtraKeys<TClass> = {}): TClass {
    const { mutations = {}, plain = false, pick = [], omit = [] } = config;

    return mockGenerator.generate(this.targetClass, {
      mutations,
      pick,
      omit,
      plain,
    }) as unknown as TClass;
  }
}
