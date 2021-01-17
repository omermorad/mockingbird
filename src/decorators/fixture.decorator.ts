import 'reflect-metadata';
import { decorateProperty } from '@plumier/reflect';
import { ClassType } from '../types/class.type';
import { FixtureOptions } from '../types/fixture-options.type';

export const FIXTURE_DECORATOR_NAME = 'Fixture';

/**
 * Using undefined (or nothing actually) will infer the value from the property type.
 * The types can be either 'string', 'number' or a 'boolean'
 *
 * @constructor
 */
export function Fixture(): PropertyDecorator;

/**
 * Will invoke the callback and generate a value from 'faker' instance
 *
 * @example
 * Fixture(faker => faker.internet.email())
 *
 * @param callback
 * @constructor
 */
export function Fixture(callback: (faker: Faker.FakerStatic) => any): PropertyDecorator;

/**
 * Generate the exact given value
 *
 * @example
 * Fixture(123)
 * Fixture('Johnny')
 * Fixture(true)
 *
 * @param value
 * @constructor
 */
export function Fixture(value: string | number | boolean): PropertyDecorator;

/**
 * Generate an object matching to the given class (assuming the class is decorated with Fixture)
 *
 * @example
 * class Dog { ... }
 * Fixture(Dog)
 *
 * @param value
 * @constructor
 */
export function Fixture(value: ClassType): PropertyDecorator;

/**
 * Generate a random value from the given enum
 *
 * @example
 * enum Feeling { Happy, Sad, Numb }
 * Fixture(Feeling)
 *
 * @param options: { enum: object }
 * @constructor
 */
export function Fixture(options: { enum: object }): PropertyDecorator;

/**
 * Generate multiple objects matching the given class (assuming the class is decorated with Fixture)
 *
 * @param options: { type: ClassType; count: number }
 * @constructor
 */
export function Fixture(options: { type: ClassType; count: number }): PropertyDecorator;

/**
 * Fixture property decorator. This decorator will be parsed and will determine
 * the actual value of the decorated property.
 *
 * @param options
 * @default undefined
 * @constructor
 */
export function Fixture(options?: FixtureOptions): PropertyDecorator {
  return decorateProperty({
    type: FIXTURE_DECORATOR_NAME,
    value: options,
  });
}
