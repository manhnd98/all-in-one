// write unit test cases for LengthGuard.inRange with 100% coverage

// Path: libs/core/guard/src/tests/length.guard.spec.ts

import { LengthGuard } from '../lib/length.guard';

describe('LengthGuard.inRange', () => {
  it('should return true if the length of a number is between min and max', () => {
    expect(LengthGuard.inRange(1, 1, 2)).toBe(true    );
  });

  it('should return true if the length of a string is between min and max', () => {
    expect(LengthGuard.inRange('1', 1, 2)).toBe(true);
  });

  it('should return true if the length of an array is between min and max', () => {
    expect(LengthGuard.inRange([1], 1, 2)).toBe(true);
  });

  it('should return false if the length of a number is not between min and max', () => {
    expect(LengthGuard.inRange(1, 2, 3)).toBe(false);
  });

  it('should return false if the length of a string is not between min and max', () => {
    expect(LengthGuard.inRange('1', 2, 3)).toBe(false);
  });

  it('should return false if the length of an array is not between min and max', () => {
    expect(LengthGuard.inRange([1], 2, 3)).toBe(false);
  });

  it('should throw an error if the value is empty', () => {
    expect(() => LengthGuard.inRange('', 1, 2)).toThrowError('Cannot check length of a value. Provided value is empty');
  });
});
