import { Faker, Class } from '@mockinbird/types';
import { ClassParser } from '@mockinbird/parser';
import { ClassReflector } from '@mockinbird/reflect';
import { MockBuilder } from './mock-builder';
import { MockGenerator } from './mock-generator';

export function MockFactory<TClass>(target: Class<TClass>): MockBuilder<TClass> {
  const reflector = new ClassReflector();
  const parser = new ClassParser(Faker, reflector);

  const generator = new MockGenerator(parser);

  return new MockBuilder<TClass>(target, generator);
}
