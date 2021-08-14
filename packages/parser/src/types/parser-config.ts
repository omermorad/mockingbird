import { Faker, OptionalClassValues } from '@mockinbird/types';

export type MutationsCallback<TClass> = (faker: Faker) => OptionalClassValues<TClass>;

export interface ParserConfig<TClass> {
  mutations?: OptionalClassValues<TClass> | MutationsCallback<TClass>;
  omit?: (keyof TClass)[];
}
