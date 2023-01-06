import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CreateLength } from "src/common/decorators";

export class BanUserDto {
  @ApiProperty({ description: "Ban reason", example: "Blocked for insults" })
  @IsString({ message: "Should be a string" })
  @CreateLength("Ban reason", { min: 2, max: 150 })
  public readonly banReason: string;
}
