import {UserDto} from "../dto/user.dto";
import {User} from "./user.service";
import {injectable} from "inversify";
import "reflect-metadata"
import mongoose from "mongoose"
import {IUser, User as UserModel} from '../models/User'
import {Token} from "../models/Token"
import {TokenService} from "./token.service";
import bcrypt from "bcryptjs";

@injectable()
export class AuthService {
    constructor() {
    }

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

    async login(body: UserDto) {
        const user: IUser | null = await UserModel.findOne({email: body.email})
        if (user) {
            const checkResemblanceDecodePassword = bcrypt.compareSync(body.password, user.password);
            if (checkResemblanceDecodePassword) {
                const instanceToken = new TokenService(user)
                await instanceToken.groupingCreatedTokens()
                // @ts-ignore
                await Token.findOneAndUpdate({user:user._id},{accessToken: instanceToken.tokens.accessToken, refreshToken: instanceToken.tokens.refreshToken})
                return instanceToken.tokens
            } else {
                return {"message": "Password doesn't resemblance"}
            }
        } else {
            return {"message": "User not found", "status": 422}
        }

    }


    private async _checkForAvailableUser(user: User) {
        type IType = IUser & mongoose.Document
        const candidateUserWithUsername: IType | null = await UserModel.findOne({username: user.username})
        const candidateUserWithEmail: IType | null = await UserModel.findOne({email: user.email})
        return !!(candidateUserWithUsername || candidateUserWithEmail)
    }
}