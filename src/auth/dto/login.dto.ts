import { ApiProperty } from "@nestjs/swagger";
import { email, password } from "src/users/users.types";
import { IsString, IsEmail } from "class-validator";
import { PasswordConfig } from "src/config/auth.config";
import { CreateLength } from "src/common/decorators";

export class LoginDto {
  @ApiProperty({ description: "Email address", example: "user@mail.com" })
  @IsString({ message: "Should be a string" })
  @IsEmail({}, { message: "Invalid email" })
  public readonly email: email;

  @ApiProperty({ description: "User password", example: "********" })
  @IsString({ message: "Should be a string" })
  @CreateLength("Password", PasswordConfig)
  public readonly password: password;
}
