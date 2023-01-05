import { BadRequestException } from "@nestjs/common";

export class EmailExistException extends BadRequestException {
  public constructor() {
    super("User with this email is already exist");
  }
}
