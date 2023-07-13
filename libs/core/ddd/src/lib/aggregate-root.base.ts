import { Entity } from './entity.base';
import {DomainEvent} from "./domain-event.base";
import {EventEmitter2} from "@nestjs/event-emitter";
import {LoggerPort} from "@all-in-one/core/port";
import {RequestContextService} from "@all-in-one/core/application";

export abstract class AggregateRoot<EntityProps> extends Entity<EntityProps> {

  private _domainEvents: DomainEvent[] = [];

  protected addEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }

  public async publishEvents(logger: LoggerPort, eventEmitter: EventEmitter2): Promise<void> {
    await Promise.all(
      this._domainEvents.map(async (event) => {
        logger.debug(
          `[${RequestContextService.getRequestId()}] "${
            event.constructor.name
          }" event published for aggregate ${this.constructor.name} : ${
            this.id
          }`,
        );
        return eventEmitter.emitAsync(event.constructor.name, event);
      }),
    );

    this.clearEvents();
  }


}
