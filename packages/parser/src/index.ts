import { Container } from 'typedi';
import { ClassParser } from './lib/parser/class-parser';
import { Faker } from '@mockinbird/common';

export * from './types/types';
export { ClassParser };

Container.set('Faker', Faker);
export const classParser = Container.get(ClassParser);
