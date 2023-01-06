import { BadRequestException } from "@nestjs/common";

export class WrongCredentialsException extends BadRequestException {
  public constructor() {
    super("Wrong email or password");
  }
}
