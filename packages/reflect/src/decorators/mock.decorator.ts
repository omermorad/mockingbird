import { LazyEnum, AbsoluteValue, FakerCallback } from '@mockingbird/common';
import { Class, decorateProperty } from '@plumier/reflect';
import { TypeFunctionValueOptions, DecoratorValueArg } from '../types';

export const MOCK_DECORATOR_NAME = 'Mock';

/**
 * Using undefined (or nothing actually) will infer the value from the property type.
 * The types can be either 'string', 'number' or a 'boolean'
 *
 * @constructor
 */
export function Mock(): PropertyDecorator;

/**
 * Generate a new instance from the given class (lazy evaluation)
 *
 * @example
 * class Bird { ... }
 * Mock(() => Bird)
 *
 * @constructor
 * @param type
 */
export function Mock(type: () => Class): PropertyDecorator;

/**
 * Generate multiple instances from the given class (lazy evaluation)
 *
 * @example
 * class Bird { ... }
 * Mock(() => Bird, { count: 3 })
 *
 * @constructor
 * @param type
 * @param options {TypeFunctionValueOptions}
 */
export function Mock(type: () => Class, options: TypeFunctionValueOptions): PropertyDecorator;

/**
 * Generate a random value from the given enum
 *
 * @example
 * enum Feeling { Happy, Sad, Numb }
 * Mock({ enum: () => Feeling})
 *
 * @constructor
 * @param enumObj
 */
export function Mock(enumObj: LazyEnum): PropertyDecorator;

/**
 * Will invoke the callback and generate a value from 'faker' instance
 *
 * @example
 * Mock(faker => faker.internet.email())
 * Mock(({ internet }) => internet.email())
 *
 * @see https://www.npmjs.com/package/faker
 * @constructor
 * @param faker
 */
export function Mock(faker: FakerCallback): PropertyDecorator;

/**
 * Generate a random value from regex
 *
 * @see https://www.npmjs.com/package/randexp
 *
 * @param regex {RegExp}
 * @constructor
 */
export function Mock(regex: RegExp): PropertyDecorator;

/**
 * Generate the exact given decoratorValue
 *
 * @example
 * Mock(123)
 * Mock('Johnny')
 * Mock(true)
 *
 * @constructor
 * @param value
 */
export function Mock(value: AbsoluteValue): PropertyDecorator;

/**
 * Mock property decorator. The options passed will determine the decorated property's generated value
 *
 * @param value
 * @param options
 * @default undefined
 * @constructor
 */
export function Mock(value?: DecoratorValueArg, options?: { count: number }): PropertyDecorator {
  return decorateProperty({
    type: MOCK_DECORATOR_NAME,
    value,
    options,
  });
}
