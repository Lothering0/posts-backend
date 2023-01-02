import { ApiProperty } from "@nestjs/swagger";
import { UserCreation, email, password } from "src/types";

export class CreateUserDto implements UserCreation {
  @ApiProperty({ example: "John Doe", description: "User name" })
  public readonly name: string;

  @ApiProperty({ example: "user@mail.com", description: "Email address" })
  public readonly email: email;

  @ApiProperty({ example: "********", description: "User password" })
  public readonly password: password;
}
