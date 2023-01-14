export class AccessTokenConfig {
  public static readonly SECRET = process.env.ACCESS_SECRET || "access_secret";
  public static readonly COOKIE_NAME = "access_token";
  public static readonly MAX_AGE = 15 * 60 * 1000;
}

export class RefreshTokenConfig {
  public static readonly SECRET =
    process.env.REFRESH_SECRET || "refresh_secret";
  public static readonly COOKIE_NAME = "refresh_token";
  public static readonly MAX_AGE = 24 * 60 * 60 * 1000;
}

export type TokenConfig = typeof AccessTokenConfig | typeof RefreshTokenConfig;
