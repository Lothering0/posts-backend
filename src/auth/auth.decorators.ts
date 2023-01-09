import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/user-roles/user-roles.types";

export const SetRequiredRoles = (...roles: UserRole[]) =>
  SetMetadata("roles", roles);
