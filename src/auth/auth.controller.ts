import {
  Controller,
  Body,
  Post,
  HttpStatus,
  HttpCode,
  Res,
  UseGuards
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Response } from "express";
import { CreateUserDto } from "src/users/dto";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { AuthResponseDto, LoginDto } from "./dto";
import {
  EmailExistException,
  WrongCredentialsException,
  UserUnauthorizedException
} from "./exceptions";
import { ApiResponseException } from "src/exceptions";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Login with email and password" })
  @ApiResponse({ status: HttpStatus.OK, type: AuthResponseDto })
  @ApiResponseException(WrongCredentialsException)
  @Post("/login")
  @HttpCode(HttpStatus.OK)
  public login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<AuthResponseDto> {
    return this.authService.login(dto, response);
  }

  @ApiOperation({ summary: "Registration new user" })
  @ApiResponse({ status: HttpStatus.CREATED, type: AuthResponseDto })
  @ApiResponseException(EmailExistException)
  @Post("/registration")
  @HttpCode(HttpStatus.CREATED)
  public registration(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<AuthResponseDto> {
    return this.authService.registration(dto, response);
  }

  @ApiOperation({ summary: "Logout from system" })
  @ApiResponse({ status: HttpStatus.OK, type: AuthResponseDto })
  @ApiResponseException(UserUnauthorizedException)
  @UseGuards(AuthGuard)
  @Post("/logout")
  @HttpCode(HttpStatus.OK)
  public logout(
    @Res({ passthrough: true }) response: Response
  ): Promise<AuthResponseDto> {
    return this.authService.logout(response);
  }
}
