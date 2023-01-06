export interface FieldConfig {
  MIN_LENGTH: number;
  MAX_LENGTH: number;
}

export interface PasswordConfig extends FieldConfig {
  SALT: number;
}
