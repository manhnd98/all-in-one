import {Command, CommandProps} from "@all-in-one/core/ddd";

export class SignupCommand extends Command {

  readonly email: string;

  readonly password: string;

  constructor(props: CommandProps<SignupCommand>) {
    super(props);
    this.email = props.email;
    this.password = props.password;
  }

}
