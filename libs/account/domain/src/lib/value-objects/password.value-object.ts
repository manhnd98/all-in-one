import {DomainPrimitive, ValueObject} from "@all-in-one/core/ddd";
import {LengthGuard} from "@all-in-one/core/guard";
import {ArgumentInvalidException} from "@all-in-one/core/exceptions";
import * as bcrypt from 'bcrypt';


/**
 * A domain model should be as close as possible to the real world.
 * In the real world, a password is not a string, it is a concept.
 * A password can be strong or weak, it can be hashed or not, it can be encrypted or not.
 */
export class Password extends ValueObject<string> {

  protected override validate(props: DomainPrimitive<string>): void {
    // add logic to validate a strong password

    // password must be at least 8 characters long
    if (!LengthGuard.inRange(props.value, 8, 50)) {
      throw new ArgumentInvalidException('Password is not strong enough')
    }

    // password must contain at least a number
    if(!props.value.match(/[a-z]/g)) {
      throw new ArgumentInvalidException('Password is not strong enough')
    }

    // password must contain at least a special character
    if(!props.value.match(/[!@#$%^&*(),.?":{}|<>]/g)) {
      throw new ArgumentInvalidException('Password is not strong enough')
    }
  }


  public hash(): string {
    const SALT_ROUNDS = 10;
    return bcrypt.hashSync(this.props.value, SALT_ROUNDS);
  }

}
