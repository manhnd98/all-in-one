import {Body, ConflictException, Controller, HttpStatus, Inject, Post} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {SignupRequestDto} from "./signup.request.dto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {ApiErrorResponse, IdResponse} from "@all-in-one/core/api";
import {match, Result} from 'oxide.ts';
import {SignupCommand} from "./signup.command";
import {AggregateId} from "@all-in-one/core/ddd";
import {AccountAlreadyExistsException} from "@all-in-one/account/domain";
import {ExceptionBase} from "@all-in-one/core/exceptions";

@Controller('v1')
export class SignupHttpController {

  constructor(@Inject(CommandBus) private readonly commandBus: CommandBus) {
  }


  @ApiOperation({summary: 'Signup'})
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email already exists',
    type: ApiErrorResponse
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Post('/account/signup')
  async signup(@Body() body: SignupRequestDto): Promise<IdResponse> {
    const command = new SignupCommand(body);
    const result: Result<AggregateId, ExceptionBase> = await this.commandBus.execute(command);

    return match(result, {
      Ok: (id: string) => new IdResponse(id),
      Err: (error: Error) => {
        if (error instanceof AccountAlreadyExistsException) {
          throw new ConflictException(error.message, error.code);
        }
        throw error;
      }
    });
  }


}
