import {RepositoryPort} from "@all-in-one/core/ddd";
import {AccountEntity} from "@all-in-one/account/domain";

export interface AccountRepositoryPort extends RepositoryPort<AccountEntity>{

  findOneByEmail(email: string): Promise<AccountEntity | null>;

}
