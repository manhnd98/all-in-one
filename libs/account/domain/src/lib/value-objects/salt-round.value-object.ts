import { DomainPrimitive, ValueObject } from "@all-in-one/core/ddd";
import { InternalServerErrorException } from "@all-in-one/core/exceptions";
import { Logger } from "@nestjs/common";

export class SaltRound extends ValueObject<number> {
  protected validate(props: DomainPrimitive<number>): void {
    if (props.value < 0) {
      throw new InternalServerErrorException("Salt round must be greater than 0");
    }

    if (props.value < 10) {
      Logger.warn(
        "Salt round is less than 10. This is not recommended for production environment"
      );
    }
  }
}
