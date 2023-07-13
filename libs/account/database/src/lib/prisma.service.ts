import { PrismaClient } from "@prisma/client";
import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { DatabaseConfig, InjectDatabaseConfig } from "@all-in-one/account/utils/config";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(@InjectDatabaseConfig() private readonly databaseConfig: DatabaseConfig) {
    super({
      datasources: {
        db: {
          url: databaseConfig.url,
        },
      },
    });
  }

  async onModuleInit(): Promise<void> {
    Logger.log("Connecting to Prisma");
    await this.$connect();
    Logger.log("Prisma connected");
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
    Logger.log("Prisma disconnected");
  }
}
