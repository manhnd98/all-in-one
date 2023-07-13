import {RequestContextService} from "@all-in-one/core/application";

export interface SerializedException {

  readonly message: string;

  readonly code: string;

  readonly correlationId: string;

  readonly stack?: string;

  readonly cause?: string;

  readonly metadata?: unknown;

}

/**
 * Base class for custom exception
 */


export abstract class ExceptionBase extends Error {

  abstract code: string;

  public readonly correlationId: string;

  constructor(message: string, readonly cause?: Error, readonly metadata?: unknown) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    const ctx = RequestContextService.getContext();
    this.correlationId = ctx.requestId;
  }

  toJSON(): SerializedException {
    return {
      message: this.message,
      code: this.code,
      stack: this.stack,
      correlationId: this.correlationId,
      cause: JSON.stringify(this.cause),
      metadata: this.metadata
    }
  }

}
