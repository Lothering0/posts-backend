import { ApiProperty } from "@nestjs/swagger";
import { HttpStatus } from "@nestjs/common";
import { exceptionMessage } from "../helpers/types";

export class ExceptionResponseTypeDto {
  @ApiProperty({ description: "Status code", example: HttpStatus.FORBIDDEN })
  public readonly statusCode: HttpStatus;

  @ApiProperty({
    description: "Exception message",
    example: "Available only for users with role admin"
  })
  public readonly message: exceptionMessage;

  @ApiProperty({ description: "Exception error name", example: "Forbidden" })
  public readonly error: string;

  public constructor(message: exceptionMessage, statusCode: HttpStatus) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
