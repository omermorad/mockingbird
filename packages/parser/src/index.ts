import { Container } from 'typedi';
import { ClassParser } from './lib/parser/class-parser';
import { Faker } from '@mockinbird/common';
import RandExp from 'randexp';

export * from './types/types';
export { ClassParser };

Container.set('Faker', Faker);
Container.set('RandExp', RandExp);

export const classParser = Container.get(ClassParser);
