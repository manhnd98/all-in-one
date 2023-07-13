import {DomainEvent, DomainEventProps} from "@all-in-one/core/ddd";

export class AccountCreatedDomainEvent extends DomainEvent {


  readonly email: string;

  constructor(props: DomainEventProps<AccountCreatedDomainEvent>) {
    super(props);

    this.email = props.email;
  }

}
