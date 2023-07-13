import { Primitives, ValueObject } from "./value-object.base";

import { Expand } from "./types";

export type AggregateId = string;

export interface BaseEntityProps {
  id: AggregateId;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEntityProps<T> {
  id: AggregateId;
  props: T;
  createdAt?: Date;

  updatedAt?: Date;
}

export type EntityObject<T> = T extends Entity<infer U>
  ? Omit<CreateEntityProps<U>, "props"> & U
  : never;

type UnpackEntity<T> = T extends Primitives | Date
  ? T
  : {
      [K in keyof T]: T[K] extends ValueObject<infer U>
        ? UnpackEntity<U>
        : T[K] extends Entity<infer U>
        ? { id: string } & UnpackEntity<U>
        : T[K];
    } & Omit<CreateEntityProps<T>, "props">;

export abstract class Entity<EntityProps = unknown> {
  constructor({ id, createdAt, updatedAt, props }: CreateEntityProps<EntityProps>) {
    this._id = id;
    // this.validateProps(props);
    const now = new Date();
    this._createdAt = createdAt || now;
    this._updatedAt = updatedAt || now;
    this.props = props;
    // this.validate();
  }

  protected readonly props: EntityProps;

  /**
   * ID is set in the concrete entity implementation to support
   * different ID types depending on your needs.
   * For example it could be a UUID for aggregate root,
   * and shortid / nanoid for child entities.
   */

  protected _id: AggregateId;

  private readonly _createdAt: Date;

  private _updatedAt: Date;

  get id(): AggregateId {
    return this._id;
  }

  private setId(id: AggregateId): void {
    this._id = id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  static isEntity<T>(entity: unknown): entity is Entity<T> {
    return entity instanceof Entity;
  }

  /**
   * Check if two entities are equal by comparing their ids.
   * If entity is not an instance of Entity, return false.
   * If entity is null or undefined, return false.
   * If entity is the current entity, return true.
   * Otherwise, return the result of comparing the ids.
   * @param object
   */
  public equals(object?: Entity<EntityProps>): boolean {
    if (object == null || object == undefined) {
      return false;
    }
    if (this === object) {
      return true;
    }
    if (!Entity.isEntity<EntityProps>(object)) {
      return false;
    }

    return this.id === object.id;
  }

  /**
   * Returns a copy of the entity props.
   * Makes sure that the props are immutable.
   * If a reference to a specific property is needed, create a getter in parent class
   * @returns {*} {Props & EntityProps}
   * @memberof Entity
   */
  public getPropsCopy(): EntityProps {
    const propsCopy: EntityProps = {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      ...this.props,
    };

    return Object.freeze(propsCopy);
  }

  /**
   * Convert an entity and all sub-entities/Value Objects to a plain object
   * with primitive values.
   *
   * Can be useful for serialization purposes (e.g. sending data over network).
   * Or logging, testing, debugging.
   */
  // public toObject(): object {
  //
  //   const plainProps = convertPropsToObject(this.props);
  //   const result = {
  //     id: this._id,
  //     createdAt: this._createdAt,
  //     updatedAt: this._updatedAt,
  //     ...plainProps,
  //
  //   }
  //   return Object.freeze(result);
  // }

  public unpack(): Expand<UnpackEntity<EntityProps>> {
    const propsCopy = { ...this.props } as EntityProps;
    for (const propKey in propsCopy) {
      const prop = propsCopy[propKey];

      if (Array.isArray(prop)) {
        propsCopy[propKey] = prop.map((item) => {
          return this.unpackProp(item);
        }) as unknown as EntityProps[Extract<keyof EntityProps, string>];
      } else {
        propsCopy[propKey] = this.unpackProp(prop) as EntityProps[Extract<
          keyof EntityProps,
          string
        >];
      }
    }

    const result = {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      ...propsCopy,
    };

    return Object.freeze(result) as unknown as Expand<UnpackEntity<EntityProps>>;
  }

  // write unpack prop and prop should be entity or value object
  private unpackProp(prop: unknown): unknown {
    if (prop instanceof Entity || prop instanceof ValueObject) {
      return prop.unpack();
    }
    return prop;
  }
}
