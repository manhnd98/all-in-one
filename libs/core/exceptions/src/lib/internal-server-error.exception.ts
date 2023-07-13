import {ExceptionBase} from "./exception.base";
import {INTERNAL_SERVER_ERROR} from "./exception.codes";


/**
 * Used to indicate that an internal server error has occurred
 */
export class InternalServerErrorException extends ExceptionBase {
  static readonly message = 'Internal Server Error';

  constructor(message = InternalServerErrorException.message) {
    super(message);
  }

  readonly code = INTERNAL_SERVER_ERROR;
}
