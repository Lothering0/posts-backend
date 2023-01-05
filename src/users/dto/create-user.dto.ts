import { ApiProperty } from "@nestjs/swagger";
import { UserCreation, email, password } from "src/users/users.types";
import { IsString, IsEmail, Length } from "class-validator";
import { nameConfig, passwordConfig } from "src/config/auth.config";

function createLength(
  field: string,
  config: { MIN_LENGTH: number, MAX_LENGTH: number }
): PropertyDecorator {
  const { MIN_LENGTH: min, MAX_LENGTH: max } = config;

  return Length(min, max, {
    message: `${field} should be more than ${min} and less than ${max}`
  });
}

const NameLength = createLength("User name", nameConfig);
const PasswordLength = createLength("Password", passwordConfig);

export class CreateUserDto implements UserCreation {
  @ApiProperty({ example: "John Doe", description: "User name" })
  @IsString({ message: "Should be a string" })
  @NameLength
  public readonly name: string;

  @ApiProperty({ example: "user@mail.com", description: "Email address" })
  @IsString({ message: "Should be a string" })
  @IsEmail({}, { message: "Invalid email" })
  public readonly email: email;

  @ApiProperty({ example: "********", description: "User password" })
  @IsString({ message: "Should be a string" })
  @PasswordLength
  public readonly password: password;
}
