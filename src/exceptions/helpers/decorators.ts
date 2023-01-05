import { HttpException } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { createErrorResponse } from "./functions";

export const ApiResponseException = <T = any>(
  exception: new (...args: T[]) => HttpException,
  ...args: T[]
) => ApiResponse(createErrorResponse(exception, ...args));
