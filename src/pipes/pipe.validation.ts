import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "src/excepitions/validation.exception";

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata) {
        const obj = plainToClass(metadata.metatype, value)
        const errors = await validate(obj)

        if (errors.length) {
            let messages = errors.map(err => {
                return {field: err.property, messages: Object.values(err.constraints)}
            })
            throw new ValidationException(messages)
        }
        return value
    }
    
}