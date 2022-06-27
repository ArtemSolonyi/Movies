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
        this.accessToken = await this._createToken(payloadData, "process.env.SECRET_KEY_ACCESS_JWT", "30m");
        this.refreshToken = await this._createToken(payloadData, "process.env.SECRET_KEY_REFRESH_JWT", "30d");
    }
    async _createToken(payloadData, secretKey, timeExpire) {
        return jwt.sign(payloadData, secretKey, { expiresIn: timeExpire });
    }
    async saveCreatedTokens() {
        var _a;
        const savedTokens = await Token.create({
            user: (_a = this.user) === null || _a === void 0 ? void 0 : _a.id,
            accessToken: this.accessToken,
            refreshToken: this.refreshToken
        });
    }
    async updateTokens() {
        var _a;
        await this.groupingCreatedTokens();
        const objectWithTokens = this.tokens;
        await Token.findOneAndUpdate({ user: (_a = this.user) === null || _a === void 0 ? void 0 : _a.id }, {
            accessToken: objectWithTokens.accessToken,
            refreshToken: objectWithTokens.refreshToken
        });
        return objectWithTokens;
    }
    async tokensForRegister() {
        await this.groupingCreatedTokens();
        await this.saveCreatedTokens();
        return this.tokens;
    }
    get tokens() {
        return { accessToken: this.accessToken, refreshToken: this.refreshToken };
    }
}
//# sourceMappingURL=token.service.js.map