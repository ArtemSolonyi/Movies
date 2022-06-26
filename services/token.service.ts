import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import {IUser} from "../models/User";
import {Token, IToken} from "../models/Token";

export class TokenService {
    private user: (IUser & mongoose.Document)
    private accessToken: string
    private refreshToken: string

    constructor(user: (IUser & mongoose.Document)) {
        this.user = user
    }

    public async groupingCreatedTokens(): Promise<void> {
        const payloadData = {
            userId: this.user.id,
            email: this.user.email,
            username: this.user.username
        }
        // @ts-ignore
        this.accessToken = await this._createToken(payloadData, "process.env.SECRET_KEY_ACCESS_JWT", "30m")
        // @ts-ignore
        this.refreshToken = await this._createToken(payloadData, "process.env.SECRET_KEY_REFRESH_JWT", "30d")
    }


    private async _createToken(payloadData: object, secretKey: string, timeExpire: string): Promise<string> {
        return jwt.sign(payloadData, secretKey, {expiresIn: timeExpire});
    }

    public async saveTokens() {
        type IType = IToken & mongoose.Document
        const savedTokens: IType = await Token.create({
            user: this.user.id,
            accessToken: this.accessToken,
            refreshToken: this.refreshToken
        })
    }

    public async tokensForRegister() {
        await this.groupingCreatedTokens()
        await this.saveTokens()
        return this.tokens
    }

    public get tokens(): object {
        return {"accessToken": this.accessToken, "refreshToken": this.refreshToken}
    }
}