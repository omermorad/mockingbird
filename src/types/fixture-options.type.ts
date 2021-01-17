import { ClassType } from './class.type';

export type FixtureOptions =
  | ((faker?: Faker.FakerStatic) => any)
  | string
  | number
  | boolean
  | ClassType
  | { enum: object }
  | { type: ClassType; count?: number };
