import { Controller } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { SignInRequestDto } from "./sign-in.request.dto";
import { IdResponse } from "@all-in-one/core/api";
import { SignInCommand } from "./sign-in.command";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class SignInMessageController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern("user.sign-in")
  async create(message: SignInRequestDto): Promise<IdResponse> {
    const command = new SignInCommand(message);

    const id = await this.commandBus.execute(command);

    return new IdResponse(id.unwrap());
  }
}
