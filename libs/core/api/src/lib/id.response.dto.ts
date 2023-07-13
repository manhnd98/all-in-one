import {ApiProperty} from "@nestjs/swagger";

// We return only the id of the created resource with a command request
// All the other properties are returned with a query request
export class IdResponse {

  @ApiProperty({ example: '2cdc8ab1-6d50-49cc-ba14-54e4ac7ec231'})
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}
