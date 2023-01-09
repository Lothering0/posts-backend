import { ApiProperty } from "@nestjs/swagger";
import { AuthToken, token } from "../auth.types";

export class AuthTokenDto implements AuthToken {
  @ApiProperty({
    example: "eyJhbGciOi.eyJpZCI6MSwiZW1haWwi.BM-5v7ix1l",
    description: "Authorization JSON Web Token"
  })
  public readonly token: token;
}
