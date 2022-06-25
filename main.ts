import {Container} from "inversify";
import {MovieController} from "./controllers/movie.controller";
import {TYPES} from "./types";
import {UserService} from "./services/user.service";
import {App} from "./index";
import {MovieService} from "./services/movie.service";

const appContainer = new Container()
appContainer.bind<MovieController>(TYPES.MovieController).to(MovieController)
appContainer.bind<UserService>(TYPES.UserService).to(UserService)
appContainer.bind<MovieService>(TYPES.MovieService).to(MovieService)
appContainer.bind<App>(TYPES.Application).to(App)
const app = appContainer.get<App>(TYPES.Application)
app.start()
export {app, appContainer}