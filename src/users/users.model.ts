import { Model, Table, Column, DataType } from "sequelize-typescript";
import { id, UserCreation, email, password } from "../types";
import { ColumnId } from "../helpers/decorators";

@Table({ tableName: "users" })
export class User extends Model<User, UserCreation> {
  @ColumnId
  public readonly id: id;

  @Column({ type: DataType.STRING, allowNull: false })
  public readonly name: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  public readonly email: email;

  @Column({ type: DataType.STRING, allowNull: false })
  public readonly password: password;

  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: false })
  public readonly banned: boolean;
}
