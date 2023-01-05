import { NotFoundException } from "@nestjs/common";

export class UserNotFoundException extends NotFoundException {
  public constructor() {
    super("Wrong email or password");
  }
}
