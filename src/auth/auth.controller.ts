import { Controller, Body, Post, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { LoginDto } from "./auth.types";
import { AuthTokenDto } from "./dto/auth-token.dto";
import { EmailExistException, UserNotFoundException } from "./exceptions";
import { ApiResponseException } from "src/exceptions";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Login with email and password" })
  @ApiResponse({ status: HttpStatus.OK, type: AuthTokenDto })
  @ApiResponseException(UserNotFoundException)
  @Post("/login")
  public login(@Body() dto: LoginDto): Promise<AuthTokenDto> {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: "Registration new user" })
  @ApiResponse({ status: HttpStatus.OK, type: AuthTokenDto })
  @ApiResponseException(EmailExistException)
  @Post("/registration")
  public registration(@Body() dto: CreateUserDto): Promise<AuthTokenDto> {
    return this.authService.registration(dto);
  }
}
