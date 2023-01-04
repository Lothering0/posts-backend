import { CreateUserDto } from "src/users/dto/create-user.dto";
import { id } from "../common/types";
import { email } from "../users/users.types";
import { UserRole } from "../user-roles/user-roles.types";

export type LoginDto = Pick<CreateUserDto, "email" | "password">;

export type token = string;

export interface AuthToken {
  readonly token: token;
}

export interface AuthTokenPayload {
  readonly id: id;
  readonly email: email;
  readonly role: UserRole;
  readonly iat?: number;
  readonly exp?: number;
}
