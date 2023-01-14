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
