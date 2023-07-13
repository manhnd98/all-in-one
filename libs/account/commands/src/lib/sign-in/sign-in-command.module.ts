import { Module } from "@nestjs/common";
import { SignInService } from "./sign-in.service";
import { SignInMessageController } from "./sign-in.message.controller";
import { SignInHttpController } from "./sign-in.http.controller";

@Module({
  controllers: [SignInMessageController, SignInHttpController],
  providers: [SignInService],
  imports: [],
})
export class SignInCommandModule {}
