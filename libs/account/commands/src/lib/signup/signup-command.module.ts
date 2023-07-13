import { Module } from "@nestjs/common";
import { SignupHttpController } from "./signup.http.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { SignupService } from "./signup.service";
import { AccountDatabaseModule } from "@all-in-one/account/database";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [SignupHttpController],
  imports: [CqrsModule, AccountDatabaseModule, JwtModule],
  exports: [],
  providers: [SignupService],
})
export class SignupCommandModule {}
