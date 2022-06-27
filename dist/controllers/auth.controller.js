var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { AuthService } from "../services/auth.service";
import express from "express";
import { UserDto, UserLoginDto } from "../dto/user.dto";
import { injectable, inject } from "inversify";
import { TYPES } from "../types";
import "reflect-metadata";
import { validator } from "../validations/validate.middleware";
import { TokenDto } from "../dto/token.dto";
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.register = async (req, res) => {
            const result = await this.authService.getRegisteredUser(req.body);
            return res.status(200).json(result);
        };
        this.login = async (req, res) => {
            const result = await this.authService.login(req.body);
            return res.status(200).json(result);
        };
        this.refresh = async (req, res) => {
            const result = await this.authService.getUpdatedTokens(req.body.refreshToken);
            return res.status(200).json(result);
        };
    }
    createRouter() {
        const router = express.Router();
        router.post('/register', validator(UserDto), this.register).post('/login', validator(UserLoginDto), this.login).put('/refresh', validator(TokenDto), this.refresh);
        return router;
    }
};
AuthController = __decorate([
    injectable(),
    __param(0, inject(TYPES.AuthService)),
    __metadata("design:paramtypes", [AuthService])
], AuthController);
export { AuthController };
//# sourceMappingURL=auth.controller.js.map