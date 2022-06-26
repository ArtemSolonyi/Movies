import jwt from 'jsonwebtoken';
import { Token } from "../models/Token";
export class TokenService {
    constructor(user) {
        this.user = user;
    }
    async groupingCreatedTokens() {
        const payloadData = {
            userId: this.user.id,
            email: this.user.email,
            username: this.user.username
        };
        this.accessToken = await this._createToken(payloadData, "process.env.SECRET_KEY_ACCESS_JWT", "30m");
        this.refreshToken = await this._createToken(payloadData, "process.env.SECRET_KEY_REFRESH_JWT", "30d");
    }
    async _createToken(payloadData, secretKey, timeExpire) {
        return jwt.sign(payloadData, secretKey, { expiresIn: timeExpire });
    }
    async saveTokens() {
        const savedTokens = await Token.create({
            user: this.user.id,
            accessToken: this.accessToken,
            refreshToken: this.refreshToken
        });
    }
    async tokensForRegister() {
        await this.groupingCreatedTokens();
        await this.saveTokens();
        return this.tokens;
    }
    get tokens() {
        return { accessToken: this.accessToken, refreshToken: this.refreshToken };
    }
}
//# sourceMappingURL=token.service.js.map