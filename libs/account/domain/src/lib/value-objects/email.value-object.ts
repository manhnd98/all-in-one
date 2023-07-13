import {DomainPrimitive, ValueObject} from "@all-in-one/core/ddd";
import {ArgumentInvalidException} from "@all-in-one/core/exceptions";


export class Email extends ValueObject<string> {

  protected override validate(props: DomainPrimitive<string>): void {
    // add logic to validate is email in valid format


    // \S+ matches any non-whitespace character (equal to [^\r\n\t\f\v ])
    // + Quantifier — Matches between one and unlimited times, as many times as possible, giving back as needed (greedy)
    // @ matches the character @ literally (case sensitive)
    // \S+ matches any non-whitespace character (equal to [^\r\n\t\f\v ])
    // \. matches the character . literally (case sensitive)
    // \S+ matches any non-whitespace character (equal to [^\r\n\t\f\v ])
    // $ asserts position at the end of a line
    const isEmailRegex = /\S+@\S+\.\S+/;
    if (!isEmailRegex.test(props.value)) {
      throw new ArgumentInvalidException('Email is not in valid format', new Error('Email is not in valid format'), {
        field: 'email'
      })
    }
  }
}
