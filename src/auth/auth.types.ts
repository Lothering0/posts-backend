import { id } from "../common/types";
import { email } from "../users/users.types";
import { UserRole } from "../user-roles/user-roles.types";
import { Request } from "express";

export type token = string;

export interface AuthTokenPayload {
  readonly id: id;
  readonly email: email;
  readonly role: UserRole;
  readonly iat?: number;
  readonly exp?: number;
}

export interface AuthRequest extends Request {
  user: AuthTokenPayload;
}
