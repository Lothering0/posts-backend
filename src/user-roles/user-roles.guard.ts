import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ForbiddenRoleException } from "./exceptions";
import { UserRole } from "./user-roles.types";

@Injectable()
export class UserRolesGuard implements CanActivate {
  public constructor(private readonly reflector: Reflector) {}

  public canActivate(context: ExecutionContext): true {
    const handler = context.getHandler();
    const roles = this.reflector.get<UserRole[]>("roles", handler);

    const request = context.switchToHttp().getRequest();
    const isAvailable = roles.includes(request.user.role);

    if (isAvailable) return true;

    throw new ForbiddenRoleException(roles);
  }
}
