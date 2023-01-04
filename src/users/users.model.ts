import { Model, Table, Column, DataType } from "sequelize-typescript";
import { id } from "../common/types";
import { UserCreation, email, password } from "./users.types";
import { UserRole } from "../user-roles/user-roles.types";
import { ColumnId } from "../common/decorators";
import { ApiProperty } from "@nestjs/swagger";

@Table({ tableName: "users" })
export class User extends Model<User, UserCreation> {
  @ApiProperty({ example: 1, description: "ID" })
  @ColumnId
  public readonly id: id;

  @ApiProperty({ example: "John Doe", description: "User name" })
  @Column({ type: DataType.STRING, allowNull: false })
  public readonly name: string;

  @ApiProperty({ example: "user@mail.com", description: "Email address" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  public readonly email: email;

  @ApiProperty({ example: "********", description: "User password" })
  @Column({ type: DataType.STRING, allowNull: false })
  public readonly password: password;

  @ApiProperty({ example: true, description: "Is user banned" })
  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: false })
  public banned: boolean;

  @Column({
    type: DataType.STRING,
    defaultValue: UserRole.USER,
    allowNull: false
  })
  public readonly role: UserRole;
}
