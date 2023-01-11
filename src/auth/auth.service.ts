import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/users.model";
import { AuthTokenPayload, token } from "./auth.types";
import { email, password } from "src/users/users.types";
import { LoginDto, AuthResponseDto } from "./dto";
import { WrongCredentialsException, EmailExistException } from "./exceptions";
import { PasswordConfig, AuthTokenConfig } from "src/config/auth.config";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  public constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  public async login(
    dto: LoginDto,
    response: Response
  ): Promise<AuthResponseDto> {
    const user = await this._validateUser(dto);
    const token = this._generateToken(user);
    this._setAuthTokenCookie(response, token);

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
    const token = this._generateToken(user);
    this._setAuthTokenCookie(response, token);

    return { message: "Success" };
  }

  private _generateToken(user: User): token {
    const payload: AuthTokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role
    };
    const token = this.jwtService.sign(payload);

    return token;
  }

  private _setAuthTokenCookie(response: Response, token: token): void {
    response.cookie("auth_token", token, {
      httpOnly: AuthTokenConfig.HTTP_ONLY,
      maxAge: AuthTokenConfig.MAX_AGE
    });
  }
}
