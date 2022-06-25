import {UserDto} from "../dto/user.dto";
import {UserService} from "./user.service";
import {injectable} from "inversify";
import "reflect-metadata"
@injectable()
export class AuthService{
    private user:UserService
    async getRegisteredUser(body: UserDto) {
        const user = await this.user.createUser(body)

    }
}