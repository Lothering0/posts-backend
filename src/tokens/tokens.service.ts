import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { id } from "src/common/types";
import { User } from "src/users";
import { Tokens } from "./tokens.model";
import { AccessTokenConfig, RefreshTokenConfig, TokenConfig } from "src/config";
import {
  TokenPayload,
  token,
  accessToken,
  refreshToken,
  tokensPair
} from "./tokens.types";
import { CreateTokensDto } from "./dto/create-tokens.dto";

@Injectable()
export class TokensService {
  public constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Tokens) private readonly tokensRepository: typeof Tokens
  ) {}

  /** Generate access and refresh tokens */
  public async generateTokens(user: User): Promise<tokensPair> {
    const accessToken = this._generateToken(user, AccessTokenConfig);
    const refreshToken = this._generateToken(user, RefreshTokenConfig);

    this.updateTokens({
      userId: user.id,
      refreshToken
    });

    return [accessToken, refreshToken];
  }

  public async createTokens(dto: CreateTokensDto): Promise<Tokens> {
    return await this.tokensRepository.create(dto);
  }

  public async updateTokens(dto: CreateTokensDto): Promise<Tokens> {
    const tokensItem = await this._findTokens(dto.userId);

    if (!tokensItem) return await this.createTokens(dto);

    tokensItem.refreshToken = dto.refreshToken;
    return await tokensItem.save();
  }

  /** Set to null token in the DB */
  public async clearTokens(userId: id): Promise<void> {
    const tokens = await this._findTokens(userId);
    tokens.refreshToken = null;
    await tokens.save();
  }

  private async _findTokens(userId: id): Promise<Tokens> {
    return await this.tokensRepository.findOne({
      where: { userId },
      include: { all: true }
    });
  }

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

  private _verifyToken(token: token, secret: string): TokenPayload {
    return this.jwtService.verify(token, { secret });
  }

  public verifyAccessToken(accessToken: accessToken): TokenPayload {
    return this._verifyToken(accessToken, AccessTokenConfig.SECRET);
  }

  public verifyRefreshToken(refreshToken: refreshToken): TokenPayload {
    return this._verifyToken(refreshToken, RefreshTokenConfig.SECRET);
  }
}
