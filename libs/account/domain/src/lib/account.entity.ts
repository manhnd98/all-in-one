import { AggregateRoot } from "@all-in-one/core/ddd";
import {
  AccountProps,
  GenerateTokenProps,
  SignInProps,
  SignupProps,
} from "./account.types";
import { v4 } from "uuid";
import { AccountCreatedDomainEvent } from "./events/account-created.domain-event";

export class AccountEntity extends AggregateRoot<AccountProps> {
  static async create(userProps: SignupProps): Promise<AccountEntity> {
    const id = v4();

    const props: AccountProps = {
      email: userProps.email,
      // hash the password
      hash: userProps.password.hash(),
    };

    const account = new AccountEntity({ id, props });

    /**
     * Add domain event and we will publish it later
     */
    account.addEvent(
      new AccountCreatedDomainEvent({
        aggregateId: id,
        email: props.email.unpack(),
      })
    );

    return account;
  }

  async signIn(props: SignInProps): Promise<boolean> {
    return Promise.resolve(true);
  }

  /**
   * The payload of the jwt token will be defined by entity
   * The developer can pass 2 different secret to generate 2 different jwt token
   * @param secret: jwt secret
   */
  private async generateToken(props: GenerateTokenProps): Promise<string> {
    const account = this.unpack();
    return await props.hashService.signAsync(
      { sub: account.id, ...account },
      { secret: props.secret.unpack(), expiresIn: props.expiresIn.unpack() }
    );
  }
}
