import { CreateUserDto } from "src/users/dto/create-user.dto";

export type LoginDto = Pick<CreateUserDto, "email" | "password">;

export type token = string;

export interface AuthToken {
  readonly token: token;
}
