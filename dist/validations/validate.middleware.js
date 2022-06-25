import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
export class ValidateMiddleware {
    constructor(classToValidate) {
        this.classToValidate = classToValidate;
    }
    execute({ body }, res, next) {
        const instance = plainToClass(this.classToValidate, body);
        validate(instance).then((errors) => {
            if (errors.length > 0) {
                res.status(422).send(errors);
            }
            else {
                next();
            }
        });
    }
}
