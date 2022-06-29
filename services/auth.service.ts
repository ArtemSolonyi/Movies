import {UserDto} from "../dto/user.dto";
import {User} from "./user.service";
import {injectable} from "inversify";
import "reflect-metadata"
import mongoose from "mongoose"
import {IUser, User as UserModel} from '../models/User'
import {Token, IToken} from "../models/Token"
import {TokenService} from "./token.service";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

@injectable()
export class AuthService {

    async getRegisteredUser(body: UserDto) {
        const user = new User(body)
        if (await this._checkForAvailableUser(user)) {
            return {"message": "User already exist"}
        } else {
            const registeredUser: (IUser & mongoose.Document) | null = await UserModel.create({
                username: user.username,
                email: user.email,
                password: user.password
            })
            const token = new TokenService(registeredUser)
            return await token.tokensForRegister()
        }
    }

    async logout(userId: string) {
        
        try {
            await Token.findOneAndUpdate({user: userId}, {
                accessToken: null,
                refreshToken: null
            }, {resultDocument: 'after'})
            return {"message":"Logout successfully"}
        } catch (e) {
            return {e}
        }
    }

    async login(body: UserDto) {
        const user: IUser | null = await UserModel.findOne({email: body.email})
        if (user) {
            const checkResemblanceDecodePassword = bcrypt.compareSync(body.password, user.password);
            if (checkResemblanceDecodePassword) {
                const tokenService: TokenService = new TokenService(user)
                return await tokenService.updateTokens()
            } else {
                return {"message": "Password doesn't resemblance"}
            }
        } else {
            return {"message": "User not found", "status": 422}
        }

    }

    public async getUpdatedTokens(refreshToken: string) {
        const confirmationTokenInAvailable: IToken | null = await Token.findOne({refreshToken: refreshToken}).lean()
        if (confirmationTokenInAvailable) {
            const user: (IUser & mongoose.Document) | null = await UserModel.findOne({_id: confirmationTokenInAvailable.user}).lean()
            const tokenService = new TokenService(user)
            return await tokenService.updateTokens()
        } else {
            return {"message": "refreshToken not found", "status": 422}
        }
    }


    private async _checkForAvailableUser(user: User): Promise<boolean> {
        type IType = IUser & mongoose.Document
        const candidateUserWithUsername: IType | null = await UserModel.findOne({username: user.username}).lean()
        const candidateUserWithEmail: IType | null = await UserModel.findOne({email: user.email}).lean()
        return !!(candidateUserWithUsername || candidateUserWithEmail)
    }
}