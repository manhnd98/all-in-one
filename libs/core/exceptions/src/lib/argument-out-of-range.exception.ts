import {ExceptionBase} from "./exception.base";
import {ARGUMENT_OUT_OF_RANGE} from "./exception.codes";

export class ArgumentOutOfRangeException extends ExceptionBase {
  readonly code = ARGUMENT_OUT_OF_RANGE;
}
