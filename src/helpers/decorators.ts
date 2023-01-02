import { Column, DataType } from "sequelize-typescript";

/** Sequelize default column for ID field */
export const ColumnId = Column({
  type: DataType.INTEGER,
  unique: true,
  autoIncrement: true,
  primaryKey: true
});
