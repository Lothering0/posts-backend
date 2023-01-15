import { Injectable } from "@nestjs/common";
import { Response } from "express";
import { TokensService, token, tokensPair } from "src/tokens";
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

const authResponse: AuthResponseDto = { message: "Success" };

@Injectable()
export class AuthService {
  public constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService
  ) {}

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
    const tokens = await this.tokensService.generateTokens(user);
    this._setTokensCookie(response, tokens);

    return authResponse;
  }

  public async login(
    dto: LoginDto,
    response: Response
  ): Promise<AuthResponseDto> {
    const user = await this._validateUser(dto);
    const tokens = await this.tokensService.generateTokens(user);
    this._setTokensCookie(response, tokens);

    return authResponse;
  }

  public async logout(response: Response): Promise<AuthResponseDto> {
    response.clearCookie("access_token");
    response.clearCookie("refresh_token");

    const { id } = response.req.user;
    this.tokensService.clearTokens(id);

    return authResponse;
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

  private _setTokensCookie(
    response: Response,
    [accessToken, refreshToken]: tokensPair
  ): void {
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
