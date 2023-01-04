import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  HttpStatus
} from "@nestjs/common";
import { UserRole } from "./user-roles.types";

export function UserRolesGuard(...roles: UserRole[]): new () => CanActivate {
  @Injectable()
  class Guard implements CanActivate {
    public canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const isAvailable = roles.includes(request.user.role);

      if (isAvailable) return true;

      throw this._generateException();
    }

    private _generateException(): ForbiddenException {
      const convertedRoles = roles.join(", ");
      let message = `Forbidden. Available only for users with role`;

      if (roles.length < 2) message += ` ${convertedRoles}`;
      else message += `s ${convertedRoles}`;

      return new ForbiddenException({
        message,
        statusCode: HttpStatus.FORBIDDEN
      })
    }
  }

  return Guard;
}
