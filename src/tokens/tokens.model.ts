import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users";
import { ColumnId } from "src/common/decorators";
import { JWT_EXAMPLE } from "src/common/constants";
import { id, Maybe } from "src/common/types";
import { refreshToken, TokensCreation } from "./tokens.types";

@Table({ tableName: "tokens" })
export class Tokens extends Model<Tokens, TokensCreation> {
  @ApiProperty({ description: "ID", example: 1 })
  @ColumnId
  public readonly id: id;

  @ApiProperty({ description: "User ID", example: 1 })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
  public readonly userId: id;

  @ApiProperty({ description: "Refresh JWT", example: JWT_EXAMPLE })
  @Column({ type: DataType.STRING, unique: true })
  public refreshToken: Maybe<refreshToken>;
}
