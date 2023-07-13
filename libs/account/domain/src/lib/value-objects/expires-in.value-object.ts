import {DomainPrimitive, ValueObject} from "@all-in-one/core/ddd";
import {ArgumentOutOfRangeException} from "@all-in-one/core/exceptions";

/**
 * ExpireIn is a domain primitive.
 * It represents the time in seconds that a token will expire.
 * an important behavior of the domain primitive is encapsulated in one place.
 * By having the domain primitive own and control domain operations,
 * you reduce the risk of bugs caused by lack of detailed domain knowledge of the concepts involved in the operation
 */
export class ExpiresIn extends ValueObject<number> {

  /**
   * In secure by design, we have a term called "domain invariant".
   * A domain invariant is a rule that must always be true in the domain.
   * In this case, the domain invariant is that the expireIn must be greater than 0 and less than 1 year.
   * The time 1 year here is arbitrary, but it is a good idea to have a maximum time for a token to expire.
   * In the business, you always have to care about lower and upper limits.
   * @param props
   * @protected
   */
  protected validate(props: DomainPrimitive<number>): void {
    if (props.value < 0) {
      throw new ArgumentOutOfRangeException("expireIn must be greater than 0 second");
    }

    const ONE_MINUTE = 60;
    const ONE_HOUR = 60 * ONE_MINUTE;
    const ONE_DAY = 24 * ONE_HOUR;
    const ONE_YEAR = 365 * ONE_DAY;
    if (props.value > ONE_YEAR) {
      throw new ArgumentOutOfRangeException("expireIn must be less than 1 year");
    }
  }
}
