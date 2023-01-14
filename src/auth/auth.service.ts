import { Injectable } from "@nestjs/common";
import { Response } from "express";
import { TokensService, token } from "src/tokens";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService, User } from "src/users";
import { email, password } from "src/users/users.types";
import { LoginDto, AuthResponseDto } from "./dto";
import { WrongCredentialsException, EmailExistException } from "./exceptions";
import {
  PasswordConfig,
  AccessTokenConfig,
  RefreshTokenConfig,
  TokenConfig
} from "src/config";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  public constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService
  ) {}

  public async login(
    dto: LoginDto,
    response: Response
  ): Promise<AuthResponseDto> {
    const user = await this._validateUser(dto);
    this._setTokensCookie(response, user);

    return { message: "Success" };
  }

  private async _validateUser({ email, password }: LoginDto): Promise<User> {
    const user = await this._validateEmail(email);

    return this._validatePassword(password, user);
  }

  private async _validateEmail(email: email): Promise<User> {
    const user = await this.usersService.getUserByEmail(email);

    if (user) return user;

    throw new WrongCredentialsException();
  }

  private async _validatePassword(
    password: password,
    user: User
  ): Promise<User> {
    const isPasswordsMatch = await bcrypt.compare(password, user.password);

    if (isPasswordsMatch) return user;

    throw new WrongCredentialsException();
  }

  public async registration(
    dto: CreateUserDto,
    response: Response
  ): Promise<AuthResponseDto> {
    const foundUser = await this.usersService.getUserByEmail(dto.email);

    if (foundUser) throw new EmailExistException();

    const hashPassword = await bcrypt.hash(dto.password, PasswordConfig.SALT);
    const user = await this.usersService.createUser({
      ...dto,
      password: hashPassword
    });
    this._setTokensCookie(response, user);

    return { message: "Success" };
  }

  private _setTokensCookie(response: Response, user: User): void {
    const [accessToken, refreshToken] = this.tokensService.generateTokens(user);

    this._setTokenCookie(response, accessToken, AccessTokenConfig);
    this._setTokenCookie(response, refreshToken, RefreshTokenConfig);
  }

  private _setTokenCookie(
    response: Response,
    token: token,
    config: TokenConfig
  ): void {
    response.cookie(config.COOKIE_NAME, token, {
      httpOnly: true,
      maxAge: config.MAX_AGE
    });
  }
}
