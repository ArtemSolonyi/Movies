import {AuthService} from "../services/auth.service"
import {Request} from "express";
import {UserDto} from "../dto/user.dto";
import {injectable, inject} from "inversify";
import {TYPES} from "../types";
import "reflect-metadata"
@injectable()
export class AuthController {
    constructor(@inject(TYPES.AuthService) private auth: AuthService) {}

    register = async (req: Request<{}, {}, UserDto>, res: Response) => {
        return await this.auth.getRegisteredUser(req.body)
    }

}