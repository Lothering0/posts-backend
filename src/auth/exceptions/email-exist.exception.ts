import { BadRequestException, HttpStatus } from "@nestjs/common";

export class EmailExistException extends BadRequestException {
  public constructor() {
    super({
      message: "User with this email already exist!",
      statusCode: HttpStatus.BAD_REQUEST
    });
  }
}
