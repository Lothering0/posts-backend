import { id } from "src/common/types";
import { email } from "src/users";
import { UserRole } from "../user-roles/user-roles.types";

export type accessToken = string;
export type refreshToken = string;
export type token = accessToken | refreshToken;
export type tokensPair = [accessToken, refreshToken];

export interface TokenPayload {
  readonly id: id;
  readonly email: email;
  readonly role: UserRole;
  readonly iat?: number;
  readonly exp?: number;
}

export interface TokensCreation {
  readonly userId: id;
  readonly refreshToken: refreshToken;
}
