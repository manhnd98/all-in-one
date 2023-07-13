import { DomainPrimitive, ValueObject } from "@all-in-one/core/ddd";
import { InternalServerErrorException } from "@all-in-one/core/exceptions";

export class JwtSecret extends ValueObject<string> {
  protected validate(props: DomainPrimitive<string>): void {
    if (props.value.length < 32) {
      throw new InternalServerErrorException(
        "JWT secret must be at least 32 characters long"
      );
    }

    if (props.value.length > 64) {
      throw new InternalServerErrorException(
        "JWT secret must be at most 64 characters long"
      );
    }
  }
}
