import { HttpStatus, NotFoundException } from "@nestjs/common";

export class UserNotFoundException extends NotFoundException {
  public constructor() {
    super({
      message: "Wrong email or password",
      statusCode: HttpStatus.NOT_FOUND
    });
  }
}
