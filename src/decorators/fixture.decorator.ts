import 'reflect-metadata';
import { decorateProperty } from '@plumier/reflect';
import { Callback, Class, EnumObject, ExactValue, MultiClass } from '../types/fixture-options.type';
import { FixtureOptions } from '../types/fixture-options.type';

export const FIXTURE_DECORATOR_NAME = 'Fixture';

/**
 * Using undefined (or nothing actually) will infer the decoratorValue from the property type.
 * The types can be either 'string', 'number' or a 'boolean'
 *
 * @constructor
 */
export function Fixture(): PropertyDecorator;

/**
 * Will invoke the callback and generate a decoratorValue from 'faker' instance
 *
 * @example
 * Fixture(faker => faker.internet.email())
 *
 * @param callback
 * @constructor
 */
export function Fixture(callback: Callback): PropertyDecorator;

/**
 * Generate the exact given decoratorValue
 *
 * @example
 * Fixture(123)
 * Fixture('Johnny')
 * Fixture(true)
 *
 * @param value
 * @constructor
 */
export function Fixture(value: ExactValue): PropertyDecorator;

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
export function Fixture(value: Class): PropertyDecorator;

/**
 * Generate a random decoratorValue from the given enum
 *
 * @example
 * enum Feeling { Happy, Sad, Numb }
 * Fixture(Feeling)
 *
 * @param options: { enum: object }
 * @constructor
 */
export function Fixture(options: EnumObject): PropertyDecorator;

/**
 * Generate multiple objects matching the given class (assuming the class is decorated with Fixture)
 *
 * @param options: { type: ClassType; count: number }
 * @constructor
 */
export function Fixture(options: MultiClass): PropertyDecorator;

/**
 * Fixture property decorator. This decorator will be parsed and will determine
 * the actual decoratorValue of the decorated property.
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
