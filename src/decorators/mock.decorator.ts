import 'reflect-metadata';
import { decorateProperty } from '@plumier/reflect';
import { Callback, Class, EnumObject, ExactValue, MultiClass } from '../types/mock-options.type';
import { MockOptions } from '../types/mock-options.type';

export const FIXTURE_DECORATOR_NAME = 'Mock';

/**
 * Using undefined (or nothing actually) will infer the value from the property type.
 * The types can be either 'string', 'number' or a 'boolean'
 *
 * @constructor
 */
export function Mock(): PropertyDecorator;

/**
 * Will invoke the callback and generate a value from 'faker' instance
 *
 * @example
 * Mock(faker => faker.internet.email())
 *
 * @param callback
 * @constructor
 */
export function Mock(callback: Callback): PropertyDecorator;

/**
 * Generate the exact given value
 *
 * @example
 * Mock(123)
 * Mock('Johnny')
 * Mock(true)
 *
 * @param value
 * @constructor
 */
export function Mock(value: ExactValue): PropertyDecorator;

/**
 * Generate an object matching to the given class (assuming the class is decorated with Mock)
 *
 * @example
 * class Dog { ... }
 * Mock(Dog)
 *
 * @param value
 * @constructor
 */
export function Mock(value: Class): PropertyDecorator;

/**
 * Generate a random value from the given enum
 *
 * @example
 * enum Feeling { Happy, Sad, Numb }
 * Mock(Feeling)
 *
 * @param options: { enum: object }
 * @constructor
 */
export function Mock(options: EnumObject): PropertyDecorator;

/**
 * Generate multiple objects matching the given class (assuming the class is decorated with Mock)
 *
 * @param options: { type: ClassType; count: number }
 * @constructor
 */
export function Mock(options: MultiClass): PropertyDecorator;

/**
 * Mock property decorator. This decorator will be parsed and will determine
 * the actual value of the decorated property.
 *
 * @param options
 * @default undefined
 * @constructor
 */
export function Mock(options?: MockOptions): PropertyDecorator {
  return decorateProperty({
    type: FIXTURE_DECORATOR_NAME,
    value: options,
  });
}
