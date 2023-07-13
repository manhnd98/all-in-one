import { Injectable } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SignInCommand } from "./sign-in.command";

@CommandHandler(SignInCommand)
export class SignInService implements ICommandHandler<SignInCommand> {
  execute(command: SignInCommand): Promise<any> {
    return Promise.resolve(undefined);
  }
}
