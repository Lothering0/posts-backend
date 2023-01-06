import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/users.model";
import { JwtService } from "@nestjs/jwt";
import { AuthTokenPayload } from "./auth.types";
import { email, password } from "src/users/users.types";
import { LoginDto, AuthTokenDto } from "./dto";
import { WrongCredentialsException, EmailExistException } from "./exceptions";
import { passwordConfig } from "src/config/auth.config";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  public constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  public async login(dto: LoginDto): Promise<AuthTokenDto> {
    const user = await this._validateUser(dto);

    return this._generateToken(user);
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

  public async registration(dto: CreateUserDto): Promise<AuthTokenDto> {
    const foundUser = await this.usersService.getUserByEmail(dto.email);

    if (foundUser) throw new EmailExistException();

    const hashPassword = await bcrypt.hash(dto.password, passwordConfig.SALT);
    const user = await this.usersService.createUser({
      ...dto,
      password: hashPassword
    });

    return this._generateToken(user);
  }

  private _generateToken(user: User): AuthTokenDto {
    const payload: AuthTokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role
    };
    const token = this.jwtService.sign(payload);

    return { token };
  }
}
