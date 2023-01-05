import { BadRequestException } from "@nestjs/common";

export class ValidationException extends BadRequestException {
  public constructor(response: any) {
    super(response);
  }
}
