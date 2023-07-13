import { Module } from '@nestjs/common';
import {SignupCommandModule} from "./signup/signup-command.module";
import {CqrsModule} from "@nestjs/cqrs";

@Module({
  controllers: [],
  providers: [],
  imports: [SignupCommandModule],
  exports: [],
})

export class AccountCommandsModule {}
