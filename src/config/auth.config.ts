export abstract class FieldConfig {
  public static MIN_LENGTH: number;
  public static MAX_LENGTH: number;
}

export class NameConfig extends FieldConfig {
  public static MIN_LENGTH = 2;
  public static MAX_LENGTH = 60;
}

export class PasswordConfig extends FieldConfig {
  public static MIN_LENGTH = 8;
  public static MAX_LENGTH = 16;
  public static SALT = 5;
};

export class AuthTokenConfig {
  public static HTTP_ONLY = true;
  public static MAX_AGE = 12 * 60 * 60 * 1000;
}
