import {NextFunction, Request, Response} from "express";
import jwt, {Jwt} from "jsonwebtoken";

import {Token} from "../models/Token";

interface JwtPayLoads {
    userId: string;
    email: string,
    username: string,

}

export class Authorization {
    async checkUser(req: Request, res: Response, next: NextFunction) {
        const accessToken: string | undefined = req.headers.authorization
        try {
            const payload = await jwt.verify(accessToken!, "process.env.SECRET_KEY_ACCESS_JWT") as Jwt & JwtPayLoads & void
            const tokenIsEquals = await Token.where({accessToken:accessToken,user:payload.userId})
            if(tokenIsEquals){
                req.body.userId = payload.userId
                next()
            }else{
                return res.status(401).json({"message":"Token was expired"})
            }
        } catch (e) {
            return res.status(401).json(e)
        }

    }
}