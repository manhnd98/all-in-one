import {IsEmail, MaxLength, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class SignupRequestDto {

  @ApiProperty({
    example: 'john@gmail.com',
    description: 'User email address',
  })
  @IsEmail()
  @MaxLength(320)
  @MinLength(5)
  readonly email: string;


  @ApiProperty({
    example: 'S@mpleP@ssw0rd!',
    description: 'User password',
  })
  @MaxLength(20)
  @MinLength(6)
  readonly password: string;


  // to prevent typescript error
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

}
