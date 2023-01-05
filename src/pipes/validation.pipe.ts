import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "./validation.exception";

@Injectable()
export class ValidationPipe implements PipeTransform<any, any> {
  public async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const object = plainToClass(metadata.metatype, value)
    const errors = await validate(object);

    if (!errors.length) return value;

    const messages = errors.map(({ property, constraints }) => {
      const values = Object.values(constraints);

      return { [property]: values };
    });

    throw new ValidationException(messages);
  }
}
