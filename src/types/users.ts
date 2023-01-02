export type email = string;
export type password = string;

export interface UserCreation {
  name: string;
  email: email;
  password: password;
}

export const enum UserRole {
  USER = "user",
  ADMIN = "admin"
}
