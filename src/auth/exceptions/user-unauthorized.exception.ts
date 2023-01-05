import { UnauthorizedException } from "@nestjs/common";

export class UserUnauthorizedException extends UnauthorizedException {
  public constructor() {
    super("Unauthorized");
  }
}
