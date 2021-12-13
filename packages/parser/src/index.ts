import { Container } from 'typedi';
import { Faker } from '@mockingbird/common';
import RandExp from 'randexp';
import { MockGenerator } from './lib/generator/mock-generator';

export * from './lib/types/types';
export * from './lib/generator/mock-generator';

Container.set('Faker', Faker);
Container.set('RandExp', RandExp);

export const mockGenerator = Container.get(MockGenerator);
