import { Model, Table, Column, DataType } from "sequelize-typescript";
import { id } from "../common/types";
import { UserCreation, email, password } from "./users.types";
import { UserRole } from "../user-roles/user-roles.types";
import { ColumnId } from "src/common/decorators";
import { ApiProperty } from "@nestjs/swagger";

@Table({ tableName: "users" })
export class User extends Model<User, UserCreation> {
  @ApiProperty({ description: "ID", example: 1 })
  @ColumnId
  public readonly id: id;

  @ApiProperty({ description: "User name", example: "John Doe" })
  @Column({ type: DataType.STRING, allowNull: false })
  public readonly name: string;

  @ApiProperty({ description: "Email address", example: "user@mail.com" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  public readonly email: email;

  @ApiProperty({ description: "User password", example: "********" })
  @Column({ type: DataType.STRING, allowNull: false })
  public readonly password: password;

  @ApiProperty({ description: "Is user banned", example: true })
  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: false })
  public banned: boolean;

  @ApiProperty({ description: "Ban reason", example: "Blocked for insults" })
  @Column({ type: DataType.STRING, defaultValue: null, allowNull: true })
  public banReason: string;

  @Column({
    type: DataType.STRING,
    defaultValue: UserRole.USER,
    allowNull: false
  })
  public readonly role: UserRole;
}
