import { ApiProperty } from "@nestjs/swagger";
import { UserCreation, email, password } from "src/users/users.types";
import { IsString, IsEmail } from "class-validator";
import { nameConfig, passwordConfig } from "src/config/auth.config";
import { CreateLength } from "src/common/decorators";

export class CreateUserDto implements UserCreation {
  @ApiProperty({ description: "User name", example: "John Doe" })
  @IsString({ message: "Should be a string" })
  @CreateLength("User name", nameConfig)
  public readonly name: string;

  @ApiProperty({ description: "Email address", example: "user@mail.com" })
  @IsString({ message: "Should be a string" })
  @IsEmail({}, { message: "Invalid email" })
  public readonly email: email;

  @ApiProperty({ description: "User password", example: "********" })
  @IsString({ message: "Should be a string" })
  @CreateLength("Password", passwordConfig)
  public readonly password: password;
}
