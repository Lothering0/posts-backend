import { UnauthorizedException, HttpStatus } from "@nestjs/common";

export class UserUnauthorizedException extends UnauthorizedException {
  public constructor() {
    super({
      message: "Unauthorized",
      statusCode: HttpStatus.UNAUTHORIZED
    });
  }
}
