var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { User } from "./user.service";
import { injectable } from "inversify";
import "reflect-metadata";
import { User as UserModel } from '../models/User';
import { Token } from "../models/Token";
import { TokenService } from "./token.service";
import bcrypt from "bcryptjs";
let AuthService = class AuthService {
    constructor() {
    }
    async getRegisteredUser(body) {
        const user = new User(body);
        if (await this._checkForAvailableUser(user)) {
            return { "message": "User already exist" };
        }
        else {
            const registeredUser = await UserModel.create({
                username: user.username,
                email: user.email,
                password: user.password
            });
            const token = new TokenService(registeredUser);
            return await token.tokensForRegister();
        }
    }
    async login(body) {
        const user = await UserModel.findOne({ email: body.email });
        if (user) {
            const checkResemblanceDecodePassword = bcrypt.compareSync(body.password, user.password);
            if (checkResemblanceDecodePassword) {
                const tokenService = new TokenService(user);
                return await tokenService.updateTokens();
            }
            else {
                return { "message": "Password doesn't resemblance" };
            }
        }
        else {
            return { "message": "User not found", "status": 422 };
        }
    }
    async getUpdatedTokens(refreshToken) {
        const confirmationTokenInAvailable = await Token.findOne({ refreshToken: refreshToken });
        if (confirmationTokenInAvailable) {
            const user = await UserModel.findOne({ _id: confirmationTokenInAvailable.user });
            const tokenService = new TokenService(user);
            return await tokenService.updateTokens();
        }
        else {
            return { "message": "refreshToken not found", "status": 422 };
        }
    }
    async _checkForAvailableUser(user) {
        const candidateUserWithUsername = await UserModel.findOne({ username: user.username });
        const candidateUserWithEmail = await UserModel.findOne({ email: user.email });
        return !!(candidateUserWithUsername || candidateUserWithEmail);
    }
};
AuthService = __decorate([
    injectable(),
    __metadata("design:paramtypes", [])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map