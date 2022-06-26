import {Container} from "inversify";
import {MovieController} from "./controllers/movie.controller";
import {TYPES} from "./types";
import {User} from "./services/user.service";
import {MovieService} from "./services/movie.service";
import {App} from "./app"
import {AuthController} from "./controllers/auth.controller";
import {AuthService} from "./services/auth.service";
const appContainer = new Container()
appContainer.bind<MovieController>(TYPES.MovieController).to(MovieController)
appContainer.bind<AuthController>(TYPES.AuthController).to(AuthController)
appContainer.bind<User>(TYPES.User).to(User)
appContainer.bind<AuthService>(TYPES.AuthService).to(AuthService)
appContainer.bind<MovieService>(TYPES.MovieService).to(MovieService)
appContainer.bind<App>(TYPES.Application).to(App)
const app = appContainer.get<App>(TYPES.Application);
await app.init()
export {appContainer}