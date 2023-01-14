import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { User } from "src/users";
import { Tokens } from "./tokens.model";
import { AccessTokenConfig, RefreshTokenConfig, TokenConfig } from "src/config";
import { TokenPayload, token, accessToken, refreshToken } from "./tokens.types";
import { CreateTokensDto } from "./dto/create-tokens.dto";

@Injectable()
export class TokensService {
  public constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Tokens) private readonly tokensRepository: typeof Tokens
  ) {}

  private _generateToken(user: User, config: TokenConfig): token {
    const payload: TokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role
    };
    const jwtOptions: JwtSignOptions = {
      secret: config.SECRET,
      expiresIn: config.MAX_AGE
    };
    const token = this.jwtService.sign(payload, jwtOptions);

    return token;
  }

  /** Generate access and refresh tokens */
  public generateTokens(user: User): [accessToken, refreshToken] {
    const accessToken = this._generateToken(user, AccessTokenConfig);
    const refreshToken = this._generateToken(user, RefreshTokenConfig);

    return [accessToken, refreshToken];
  }

  private _verifyToken(token: token, secret: string): TokenPayload {
    return this.jwtService.verify(token, { secret });
  }

  public verifyAccessToken(accessToken: accessToken): TokenPayload {
    return this._verifyToken(accessToken, AccessTokenConfig.SECRET);
  }

  public verifyRefreshToken(refreshToken: refreshToken): TokenPayload {
    return this._verifyToken(refreshToken, RefreshTokenConfig.SECRET);
  }

  public async createTokens(dto: CreateTokensDto): Promise<Tokens> {
    return await this.tokensRepository.create(dto);
  }
}
