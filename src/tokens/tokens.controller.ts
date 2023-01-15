import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Tokens")
@Controller("tokens")
export class TokensController {
  @Get("/refresh")
  public refreshTokens(): void {}
}
