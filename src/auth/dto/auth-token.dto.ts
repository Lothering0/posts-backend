import { ApiProperty } from "@nestjs/swagger";
import { AuthToken, token } from "../auth.types";

export class AuthTokenDto implements AuthToken {
  @ApiProperty({
    example: "eyJhbGciOi.eyJpZCI6MSwiZW1haWwi.XXXXXXXXXX",
    description: "Authorization JSON Web Token"
  })
  public readonly token: token;
}
