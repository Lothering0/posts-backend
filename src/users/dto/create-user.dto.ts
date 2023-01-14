import { ApiProperty } from "@nestjs/swagger";
import { UserCreation, email, password } from "src/users/users.types";
import { IsString, IsEmail } from "class-validator";
import { NameConfig, PasswordConfig } from "src/config/auth.config";
import { CreateLength } from "src/common/decorators";

export class CreateUserDto implements UserCreation {
  @ApiProperty({ description: "User name", example: "John Doe" })
  @IsString({ message: "Should be a string" })
  @CreateLength("User name", NameConfig)
  public readonly name: string;

  @ApiProperty({ description: "Email address", example: "user@mail.com" })
  @IsEmail({}, { message: "Invalid email" })
  public readonly email: email;

  @ApiProperty({ description: "User password", example: "********" })
  @IsString({ message: "Should be a string" })
  @CreateLength("Password", PasswordConfig)
  public readonly password: password;
}
