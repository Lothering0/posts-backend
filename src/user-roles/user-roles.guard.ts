import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  HttpStatus
} from "@nestjs/common";
import { UserRole } from "./user-roles.types";
import { canActivateReturnableType } from "src/common/types";

export function UserRolesGuard(...roles: UserRole[]): new () => CanActivate {
  @Injectable()
  class RolesGuard implements CanActivate {
    public canActivate(context: ExecutionContext): canActivateReturnableType {
      const request = context.switchToHttp().getRequest();
      const isAvailable = roles.includes(request.user.role);

      if (isAvailable) return true;

      throw this._generateException();
    }

    private _generateException(): ForbiddenException {
      return new ForbiddenException({
        message: this._generateMessage(),
        statusCode: HttpStatus.FORBIDDEN
      })
    }

    private _generateMessage(): string {
      const convertedRoles = roles.join(", ");
      let message = `Forbidden. Available only for users with role`;

      if (roles.length < 2) message += ` ${convertedRoles}`;
      else message += `s ${convertedRoles}`;

      return message;
    }
  }

  return RolesGuard;
}
