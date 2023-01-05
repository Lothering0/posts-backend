import { ForbiddenException, HttpStatus } from "@nestjs/common";
import { UserRole } from "../user-roles.types";

function generateMessage(roles: UserRole[]): string {
  const convertedRoles = roles.join(", ");
  let message = `Forbidden. Available only for users with role`;

  if (roles.length < 2) message += ` ${convertedRoles}`;
  else message += `s ${convertedRoles}`;

  return message;
}

export class ForbiddenRoleException extends ForbiddenException {
  public constructor(roles: UserRole[]) {
    super({
      message: generateMessage(roles),
      statusCode: HttpStatus.FORBIDDEN
    });
  }
}
