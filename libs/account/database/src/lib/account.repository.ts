import { AccountRepositoryPort } from "./account.repository.port";
import { AccountEntity } from "@all-in-one/account/domain";
import { Paginated, PaginatedQueryParams } from "@all-in-one/core/ddd";
import { None, Option } from "oxide.ts";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Injectable()
export class AccountRepository implements AccountRepositoryPort {
  constructor(private prismaService: PrismaService) {}

  delete(entity: AccountEntity): Promise<boolean> {
    return Promise.resolve(false);
  }

  findAll(): Promise<AccountEntity[]> {
    return Promise.resolve([]);
  }

  findAllPaginated(params: PaginatedQueryParams): Promise<Paginated<AccountEntity>> {
    const paginate = new Paginated<AccountEntity>({
      data: [],
      count: 0,
      limit: params.limit,
      page: params.page,
    });

    return Promise.resolve(paginate);
  }

  findOneByEmail(email: string): Promise<AccountEntity | null> {
    return Promise.resolve(null);
  }

  async findOneById(id: string): Promise<Option<AccountEntity>> {
    this.prismaService.account
      .findUniqueOrThrow({
        where: {
          id: id,
        },
      })
      .then();

    return None;

    // return Promise.resolve(undefined);
  }

  async insert(entity: AccountEntity): Promise<void> {
    await this.prismaService.account.create({
      data: {
        ...entity.unpack(),
      },
    });
  }
}
