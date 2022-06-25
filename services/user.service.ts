import {UserDto} from "../dto/user.dto";
import {User} from "../models/User"
export class UserService {

     async createUser(body: UserDto) {
        return await User.create()
    }

}