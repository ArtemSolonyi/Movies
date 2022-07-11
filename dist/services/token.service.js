import jwt from 'jsonwebtoken';
import { Token } from "../models/Token";
export class TokenService {
    constructor(user) {
        this.user = user;
    }
    async groupingCreatedTokens() {
        var _a, _b, _c;
        const payloadData = {
            userId: (_a = this.user) === null || _a === void 0 ? void 0 : _a.id,
            email: (_b = this.user) === null || _b === void 0 ? void 0 : _b.email,
            username: (_c = this.user) === null || _c === void 0 ? void 0 : _c.username
        };
        this._accessToken = await this._createToken(payloadData, "process.env.SECRET_KEY_ACCESS_JWT", "15m");
        this._refreshToken = await this._createToken(payloadData, "process.env.SECRET_KEY_REFRESH_JWT", '30d');
    }
    async _createToken(payloadData, secretKey, timeExpire) {
        return jwt.sign(payloadData, secretKey, { expiresIn: timeExpire });
    }
    async saveCreatedTokens() {
        var _a;
        const savedTokens = await Token.create({
            user: (_a = this.user) === null || _a === void 0 ? void 0 : _a.id,
            accessToken: this._accessToken,
            refreshToken: this._refreshToken
        });
    }
    get accessToken() {
        return this._accessToken;
    }
    get refreshToken() {
        return this._refreshToken;
    }
    async updateTokens() {
        var _a;
        await this.groupingCreatedTokens();
        await Token.findOneAndUpdate({ user: (_a = this.user) === null || _a === void 0 ? void 0 : _a.id }, {
            accessToken: this._accessToken,
            refreshToken: this._refreshToken
        });
    }
    async tokensForRegister() {
        await this.groupingCreatedTokens();
        await this.saveCreatedTokens();
    }
}
//# sourceMappingURL=token.service.js.map