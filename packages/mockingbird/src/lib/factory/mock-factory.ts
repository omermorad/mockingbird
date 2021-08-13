import { Faker, Class } from '@mockinbird/types';
import { ClassParser } from '@mockinbird/parser';
import { ClassReflector } from '@mockinbird/reflect';
import { MockBuilder } from '../builder';
import { MockGenerator } from '../generator/mock-generator';

/**
 * MockFactory take the target class as a parameter and returns
 * a MockBuilder which enables to chain some methods and compose
 * a new mock or mocks.
 *
 * @param target {Class<TClass>} the class to create mock(s) from
 * @returns {MockBuilder<TClass>} new builder to compose a mock
 */
export function MockFactory<TClass>(target: Class<TClass>): MockBuilder<TClass> {
  const reflector = new ClassReflector();
  const parser = new ClassParser(Faker, reflector);

  const generator = new MockGenerator(parser);

  return new MockBuilder<TClass>(target, generator);
}
