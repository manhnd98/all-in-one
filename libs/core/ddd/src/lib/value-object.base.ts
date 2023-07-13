import {EmptyGuard} from "@all-in-one/core/guard";
import {ArgumentNotProvidedException} from "@all-in-one/core/exceptions";

export type Primitives = string | number | boolean;

export interface DomainPrimitive<T extends Primitives> {
  value: T;
}

type ValueObjectProps<T> = T extends Primitives ? DomainPrimitive<T> : T;


export abstract class ValueObject<T> {

  protected readonly props: ValueObjectProps<T>;

  constructor(props: ValueObjectProps<T>) {
    this.checkIfEmpty(props);
    this.validate(props);
    this.props = props;
  }

  static isValueObject(obj: unknown): obj is ValueObject<unknown> {
    return obj instanceof ValueObject;
  }

  protected abstract validate(props: ValueObjectProps<T>): void;

  private checkIfEmpty(props: ValueObjectProps<T>): void {
    if (EmptyGuard(props as unknown as object) || (this.isDomainPrimitive(props) && EmptyGuard(props.value))) {
      throw new ArgumentNotProvidedException("Property cannot be empty");
    }
  }

  private isDomainPrimitive(obj: unknown): obj is DomainPrimitive<T & (Primitives )> {

    if(Object.prototype.hasOwnProperty.call(obj, 'value')) {
      return true;
    }

    return false;
  }

  public unpack(): T {
    if (this.isDomainPrimitive(this.props)) {
      // return this.props.value;
      return this.props.value;
    }

    // const propsCopy = convertPropsToObject(this.props);

    // const propsCopy = {...this.props};
    //
    // for (const props in propsCopy) {
    //   if(Array.isArray(propsCopy[props])) {
    //     propsCopy[props] = (propsCopy[props] as Array<unknown>).map(item => {
    //       return convertToPlainObject(item)
    //     });
    //   }
    //
    //   propsCopy[props] = convertToPlainObject(propsCopy[props]);
    // }

    return Object.freeze({} as T);
    // return Object.freeze(propsCopy);
  }


}
