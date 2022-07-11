import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import {IUser} from "../models/User";
import {Token, IToken} from "../models/Token";

export class TokenService {
    private user: (IUser & mongoose.Document) | null
    private _accessToken: string
    private _refreshToken: string

    constructor(user: (IUser & mongoose.Document) | null) {
        this.user = user
    }

    public async groupingCreatedTokens(): Promise<void> {
        const payloadData = {
            userId: this.user?.id,
            email: this.user?.email,
            username: this.user?.username
        }
        // @ts-ignore
        this._accessToken = await this._createToken(payloadData, "process.env.SECRET_KEY_ACCESS_JWT", "15m")
        // @ts-ignore
        this._refreshToken = await this._createToken(payloadData, "process.env.SECRET_KEY_REFRESH_JWT", '30d')
    }


    private async _createToken(payloadData: object, secretKey: string, timeExpire: string): Promise<string> {
        return jwt.sign(payloadData, secretKey, {expiresIn: timeExpire});
    }

    public async saveCreatedTokens() {
        type IType = IToken & mongoose.Document
        const savedTokens: IType = await Token.create({
            user: this.user?.id,
            accessToken: this._accessToken,
            refreshToken: this._refreshToken
        })
    }
    public get accessToken(){
        return this._accessToken
    }
    public get refreshToken(){
        return this._refreshToken
    }
    public async updateTokens() {
        await this.groupingCreatedTokens()
        await Token.findOneAndUpdate({user: this.user?.id}, {
            accessToken: this._accessToken,
            refreshToken:this._refreshToken
        },)

    }

    public async tokensForRegister() {
        await this.groupingCreatedTokens()
        await this.saveCreatedTokens()
    }


}