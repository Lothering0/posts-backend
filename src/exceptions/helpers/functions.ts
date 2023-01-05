import { HttpException } from "@nestjs/common";
import { ApiResponseOptions } from "@nestjs/swagger";
import { ExceptionResponseTypeDto } from "../dto/exception-response-type.dto";

export function createErrorResponse<T = any>(
  exception: new (...args: T[]) => HttpException,
  ...args: T[]
): ApiResponseOptions {
  const {
    statusCode,
    message
  } = new exception(...args).getResponse() as ExceptionResponseTypeDto;

  return {
    status: statusCode,
    description: message,
    type: ExceptionResponseTypeDto
  };
}

