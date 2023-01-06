import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ForbiddenRoleException } from "./exceptions";
import { UserRole } from "./user-roles.types";

export function UserRolesGuard(...roles: UserRole[]): new () => CanActivate {
  @Injectable()
  class RolesGuard implements CanActivate {
    public canActivate(context: ExecutionContext): true {
      const request = context.switchToHttp().getRequest();
      const isAvailable = roles.includes(request.user.role);

      if (isAvailable) return true;

      throw new ForbiddenRoleException(roles);
    }
  }

  return RolesGuard;
}
