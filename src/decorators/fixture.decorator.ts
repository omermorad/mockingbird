import 'reflect-metadata';
import { decorateProperty } from '@plumier/reflect';
import { ClassType } from '../types/class.type';
import { FixtureOptions } from '../types/fixture-options.type';

export const FIXTURE_DECORATOR_NAME = 'Fixture';

export function Fixture();
export function Fixture(callback: (faker: Faker.FakerStatic) => any);
export function Fixture(value: string);
export function Fixture(value: number);
export function Fixture(value: boolean);
export function Fixture(value: Date);
export function Fixture(value: ClassType);
export function Fixture(options: { enum: object });
export function Fixture(options: { type: ClassType; count: number });

export function Fixture(options?: FixtureOptions): PropertyDecorator {
  return decorateProperty({
    type: FIXTURE_DECORATOR_NAME,
    value: options,
  });
}
