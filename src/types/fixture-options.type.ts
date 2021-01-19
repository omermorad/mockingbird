import { ClassType } from './class.type';
import { ExactValue } from 'src/types/exact-value.type';

export type MultiClass = { type: ClassType; count?: number };

export type FixtureOptions =
  | ((faker?: Faker.FakerStatic) => any)
  | ExactValue
  | ClassType
  | { enum: object }
  | MultiClass;
