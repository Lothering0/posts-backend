export abstract class FieldConfig {
  public static readonly MIN_LENGTH: number;
  public static readonly MAX_LENGTH: number;
}

export class NameConfig extends FieldConfig {
  public static readonly MIN_LENGTH = 2;
  public static readonly MAX_LENGTH = 60;
}

export class PasswordConfig extends FieldConfig {
  public static readonly MIN_LENGTH = 8;
  public static readonly MAX_LENGTH = 16;
  public static readonly SALT = 5;
};

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
