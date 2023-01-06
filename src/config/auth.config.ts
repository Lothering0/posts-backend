import { FieldConfig, PasswordConfig } from "./helpers/types";

export const nameConfig: FieldConfig = {
  MIN_LENGTH: 2,
  MAX_LENGTH: 60
};

export const passwordConfig: PasswordConfig = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 16,
  SALT: 5
};
