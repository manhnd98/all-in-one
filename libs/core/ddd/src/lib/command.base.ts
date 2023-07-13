import {v4} from 'uuid';
import {EmptyGuard} from "@all-in-one/core/guard";
import {ArgumentNotProvidedException} from "@all-in-one/core/exceptions";
import {RequestContextService} from "@all-in-one/core/application";

export type CommandProps<T> = Omit<T, 'id' | 'metadata'> & Partial<Command>;

type CommandMetadata = {
  readonly correlationId: string;

  readonly causationId?: string;

  readonly userId?: string;

  readonly timestamp: number;
}

export class Command {
  readonly id: string;

  readonly metadata: CommandMetadata;

  constructor(props: CommandProps<unknown>) {
    if (EmptyGuard(props)) {
      throw new ArgumentNotProvidedException(
        'Command props should not be empty',
      );
    }
    const ctx = RequestContextService.getContext();
    this.id = props.id || v4();
    this.metadata = {
      correlationId: props?.metadata?.correlationId || ctx.requestId,
      causationId: props?.metadata?.causationId,
      timestamp: props?.metadata?.timestamp || Date.now(),
      userId: props?.metadata?.userId,
    };
  }
}
