import {Option} from "oxide.ts";

export class Paginated<T> {

  // total number of items
  readonly count: number;

  // number of items per page
  readonly limit: number;

  // current page number
  readonly page: number;

  // items on the current page
  readonly data: readonly T[];

  constructor(props: Paginated<T>) {
    this.count = props.count;
    this.limit = props.limit;
    this.page = props.page;
    this.data = props.data;
  }
}

export type OrderBy = { field: string | true; param: 'asc' | 'desc' };

export type PaginatedQueryParams = {
  limit: number;
  page: number;
  offset: number;
  orderBy: OrderBy;
}


export interface RepositoryPort<Entity> {

  insert(entity: Entity): Promise<void>;

  findOneById(id: string): Promise<Option<Entity>>;

  findAll(): Promise<Entity[]>;

  findAllPaginated(params: PaginatedQueryParams): Promise<Paginated<Entity>>;

  delete(entity: Entity): Promise<boolean>;
}
