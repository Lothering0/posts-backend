import { NotFoundException, HttpStatus } from "@nestjs/common";

export class UserNotFoundException extends NotFoundException {
  public constructor() {
    super({
      message: "User not found",
      statusCode: HttpStatus.NOT_FOUND
    });
  }
}
