import { Catch, ArgumentsHost } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { ForbiddenRoleException } from "./forbidden-role.exception";

@Catch(ForbiddenRoleException)
export class ForbiddenRoleExceptionFilter extends BaseExceptionFilter {
  public catch(exception: any, host: ArgumentsHost): void {
    exception.response = {
      statusCode: exception.status,
      error: "Forbidden",
      ...exception.response
    };

    super.catch(exception, host);
  }
}
