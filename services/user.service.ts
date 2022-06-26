import {UserDto} from "../dto/user.dto";
import "reflect-metadata"
import bcrypt from 'bcryptjs';
import {injectable} from "inversify";


@injectable()
export class User {
    private readonly _username: string;
    private readonly _email: string;
    private _password: string;

    constructor(body: UserDto) {
        this._username = body.username
        this._email = body.email
        this._password = body.password
        this._hashPassword().then()

    }

    public get password() {
        return this._password
    }

    public get username() {
        return this._username
    }

    public get email() {
        return this._email
    }

    private async _hashPassword(): Promise<any> {
        const salt = bcrypt.genSaltSync(5);
        this._password = await bcrypt.hashSync(this._password, salt);
    }

}