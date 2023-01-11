import { ApiProperty } from "@nestjs/swagger";

export class AuthResponseDto {
  @ApiProperty({
    example: "Success",
    description: "Status of authorization/registration request"
  })
  public readonly message: "Success";
}
