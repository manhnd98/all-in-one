import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AccountConfigModule } from "./account-config.module";
import { AccountCommandsModule } from "@all-in-one/account/commands";
import { RequestContextModule } from "nestjs-request-context";

@Module({
  imports: [AccountConfigModule, AccountCommandsModule, RequestContextModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
