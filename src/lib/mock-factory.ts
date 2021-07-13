import fs from 'fs';
import { Class } from '../types';
import { MockBuilder } from './mock-builder';
import { MockPersistent } from './mock-persistent';

export function MockFactory<TClass extends Class = any>(target: Class): MockBuilder<TClass> {
  const persistent = new MockPersistent(fs, {
    fileName: '',
  });

  return new MockBuilder<TClass>(target, persistent);
}

class Dog {}

MockFactory(Dog).toPlain().persist('lots-of-dogs').many(3);
