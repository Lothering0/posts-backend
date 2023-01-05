import { ApiProperty } from "@nestjs/swagger";
import { HttpStatus } from "@nestjs/common";
import { exceptionMessage } from "../types";

export class ExceptionResponseTypeDto {
  @ApiProperty({ description: "Exception message", example: "Unauthorized" })
  public readonly message: exceptionMessage;

  @ApiProperty({ description: "Status code", example: HttpStatus.UNAUTHORIZED })
  public readonly statusCode: HttpStatus;

  public constructor(message: string, statusCode: HttpStatus) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
