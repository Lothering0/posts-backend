import { CreateUserDto } from "src/users/dto/create-user.dto";
import { id } from "../helpers/types";
import { email, UserRole } from "../users/users.types";

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
