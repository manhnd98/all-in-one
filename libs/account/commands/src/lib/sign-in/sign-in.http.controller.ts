import { Body, Controller, Inject, Post } from "@nestjs/common";
import { IdResponse } from "@all-in-one/core/api";
import { SignInRequestDto } from "./sign-in.request.dto";
import { CommandBus } from "@nestjs/cqrs";
import { SignInCommand } from "./sign-in.command";

@Controller("v1")
export class SignInHttpController {
  constructor(@Inject() private commandBus: CommandBus) {}

  @Post("account/sign-in")
  async signIn(@Body() body: SignInRequestDto): Promise<IdResponse> {
    const command = new SignInCommand(body);
    const id = await this.commandBus.execute(command);

    return new IdResponse(id.unwrap());
  }
}
