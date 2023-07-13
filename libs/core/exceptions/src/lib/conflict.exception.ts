import {ExceptionBase} from "./exception.base";
import {CONFLICT} from "./exception.codes";

/**
 * Used to indicate conflicting entities (usually in the database)
 *
 * @class ConflictException
 * @extends {ExceptionBase}
 */
export class ConflictException extends ExceptionBase {
  readonly code = CONFLICT;
}
