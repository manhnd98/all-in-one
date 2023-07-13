import {ExceptionBase} from "./exception.base";
import {NOT_FOUND} from "./exception.codes";

/**
 * Used to indicate that entity is not found
 *
 * @class NotFoundException
 * @extends {ExceptionBase}
 */

export class NotFoundException extends ExceptionBase {
  static readonly message = 'Not found';

  constructor(message = NotFoundException.message) {
    super(message);
  }

  readonly code = NOT_FOUND;
}
