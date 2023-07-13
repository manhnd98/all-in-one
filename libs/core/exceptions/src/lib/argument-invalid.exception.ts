import {ExceptionBase} from "./exception.base";
import {ARGUMENT_INVALID} from "./exception.codes";


/**
 * Used to indicate that an incorrect argument was provided to a method/function/class constructor
 * */
export class ArgumentInvalidException extends ExceptionBase {
  readonly code = ARGUMENT_INVALID;
}
