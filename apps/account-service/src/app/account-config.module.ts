import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import {
  authConfig,
  databaseConfig,
  rabbitmqConfig,
} from "@all-in-one/account/utils/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [rabbitmqConfig, databaseConfig, authConfig],
    }),
  ],
})
export class AccountConfigModule {}
