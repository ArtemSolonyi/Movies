import {UserDto} from "../dto/user.dto";
import {User} from "../models/User"
import "reflect-metadata"
import {injectable} from "inversify";
@injectable()
export class UserService {

     async createUser(body: UserDto) {
        return await User.create()
    }

}