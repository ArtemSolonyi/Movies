var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { UserDto } from "../dto/user.dto";
import "reflect-metadata";
import bcrypt from 'bcryptjs';
import { injectable } from "inversify";
let User = class User {
    constructor(body) {
        this._username = body.username;
        this._email = body.email;
        this._password = body.password;
        this._hashPassword().then();
    }
    get password() {
        return this._password;
    }
    get username() {
        return this._username;
    }
    get email() {
        return this._email;
    }
    async _hashPassword() {
        const salt = bcrypt.genSaltSync(5);
        this._password = await bcrypt.hashSync(this._password, salt);
    }
};
User = __decorate([
    injectable(),
    __metadata("design:paramtypes", [UserDto])
], User);
export { User };
//# sourceMappingURL=user.service.js.map