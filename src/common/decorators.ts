import { Column, DataType } from "sequelize-typescript";
import { Length } from "class-validator";
import { FieldConfig } from "src/config/helpers/types";

interface LengthConfig {
  min: number;
  max: number;
}

type CreateLengthConfig = Partial<FieldConfig & LengthConfig>;

/** Decorator based on class-validator Length */
export function CreateLength(
  field: string,
  config: FieldConfig
): PropertyDecorator;
export function CreateLength(
  field: string,
  config: LengthConfig
): PropertyDecorator;
export function CreateLength(
  field: string,
  config: CreateLengthConfig
): PropertyDecorator {
  const min = config.min ?? config.MIN_LENGTH;
  const max = config.max ?? config.MAX_LENGTH;

  return Length(min, max, {
    message: `${field} should be more than ${min} and less than ${max}`
  });
};

/** Sequelize default column for ID field */
export const ColumnId = Column({
  type: DataType.INTEGER,
  unique: true,
  autoIncrement: true,
  primaryKey: true
});
