import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/users.model";
import { JwtService } from "@nestjs/jwt";
import { LoginDto, AuthTokenPayload } from "./auth.types";
import { AuthTokenDto } from "./dto/auth-token.dto";
import { UserNotFoundException, EmailExistException } from "./exceptions";
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
    const exception = new UserNotFoundException();

    const user = await this.usersService.getUserByEmail(email);
    if (!user) throw exception;

    const isPasswordsMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordsMatch) throw exception;

    return user;
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
