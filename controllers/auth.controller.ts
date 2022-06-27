import {AuthService} from "../services/auth.service"
import express, {Request, Response} from "express";
import {UserDto, UserLoginDto} from "../dto/user.dto";
import {injectable, inject} from "inversify";
import {TYPES} from "../types";
import "reflect-metadata"
import {validator} from "../validations/validate.middleware";
import {MovieDto} from "../dto/movie.dto";
import {TokenDto} from "../dto/token.dto";

@injectable()
export class AuthController {
    constructor(@inject(TYPES.AuthService) private authService: AuthService) {
    }

    private register = async (req: Request<{}, {}, UserDto>, res: Response): Promise<Response> => {
        const result = await this.authService.getRegisteredUser(req.body)
        return res.status(200).json(result)
    }
    private login = async (req: Request<{}, {}, UserDto>, res: Response): Promise<Response> => {
        const result = await this.authService.login(req.body)
        return res.status(200).json(result)
    }
    private refresh = async (req: Request<{ refreshToken: string }, {}, TokenDto, {}>, res: Response) => {
        const result = await this.authService.getUpdatedTokens(req.body.refreshToken)
        return res.status(200).json(result)
    }

    public createRouter() {
        const router = express.Router()
        router.post('/register', validator(UserDto), this.register).post('/login', validator(UserLoginDto), this.login).put('/refresh', validator(TokenDto), this.refresh)
        return router
    }
}