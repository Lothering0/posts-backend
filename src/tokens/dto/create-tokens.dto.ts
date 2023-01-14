import { ApiProperty } from "@nestjs/swagger";
import { IsJWT, IsNumber } from "class-validator";
import { TokensCreation } from "../tokens.types";
import { id } from "src/common/types";
import { JWT_EXAMPLE } from "src/common/constants";
import { refreshToken } from "../tokens.types";

export class CreateTokensDto implements TokensCreation {
  @ApiProperty({ description: "User ID", example: 1 })
  @IsNumber({}, { message: "Should be a number" })
  public readonly userId: id;

  @ApiProperty({ description: "Refresh JWT", example: JWT_EXAMPLE })
  @IsJWT({ message: "Should be a JWT" })
  public readonly refreshToken: refreshToken;
}
