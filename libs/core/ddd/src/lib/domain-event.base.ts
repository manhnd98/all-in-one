import {RequestContextService} from "@all-in-one/core/application";
import {v4} from "uuid";

type DomainEventMetadata = {

  readonly timestamp: number;

  readonly correlationId: string;

  readonly causationId?: string;

  readonly userId?: string;

}

export type DomainEventProps<T> = Omit<T, 'id' | 'metadata'> & {
  aggregateId: string;

  metadata?: DomainEventMetadata;
}

export abstract class DomainEvent {

  public readonly id: string;

  public readonly aggregateId: string;

  public readonly metadata: DomainEventMetadata;

  constructor(props: DomainEventProps<unknown>) {
    this.id = v4();
    this.aggregateId = props.aggregateId;
    this.metadata = {
      correlationId: props?.metadata?.correlationId || RequestContextService.getRequestId(),
      causationId: props?.metadata?.causationId,
      timestamp: props?.metadata?.timestamp || Date.now(),
      userId: props?.metadata?.userId,
    };
  }

}
