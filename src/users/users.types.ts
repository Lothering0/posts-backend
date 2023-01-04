export type email = string;
export type password = string;

export interface UserCreation {
  readonly name: string;
  readonly email: email;
  readonly password: password;
}
