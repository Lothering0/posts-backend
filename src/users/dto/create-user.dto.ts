import { UserCreation, email, password } from "src/types";

export class CreateUserDto implements UserCreation {
  public readonly name: string;
  public readonly email: email;
  public readonly password: password;
}
