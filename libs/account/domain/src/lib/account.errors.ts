import {ExceptionBase} from "@all-in-one/core/exceptions";

export class AccountAlreadyExistsException extends ExceptionBase {
  static readonly message = 'Account already exists';

  public readonly code = 'ACCOUNT.ALREADY_EXISTS';

  constructor(cause?: Error, metadata?: unknown) {
    super(AccountAlreadyExistsException.message, cause, metadata);
  }
}
