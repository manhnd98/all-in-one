import {EmptyGuard} from "./empty.guard";

export class LengthGuard {

/**
 * Check if the length of a value is between min and max
 * Accepts numbers, strings and arrays
 * Throws an error if the value is empty
 * Returns true if the length is between min and max
 * Returns false if the length is not between min and max
 * @example
 * ```ts
 * LengthGuard(1, 1, 2) // true
 * LengthGuard('1', 1, 2) // true
 * LengthGuard([1], 1, 2) // true
 * LengthGuard(1, 2, 3) // false
 * LengthGuard('1', 2, 3) // false
 * LengthGuard([1], 2, 3) // false
 * ```
 * @throws ArgumentNotProvidedException
 * @see EmptyGuard
 * @see ArgumentNotProvidedException
 *
 * @category Guard
 * @constructor
 * @since 1.0.0
 */
  static inRange(value: number | string | Array<unknown>, min: number, max: number): boolean {
    if (EmptyGuard(value)) {
      throw new Error('Cannot check length of a value. Provided value is empty');
    }

    const valueLength = typeof value === 'number' ? Number(value).toString().length : value.length;
    if (valueLength >= min && valueLength <= max) {
      return true;
    }

    return false;

  }
}
