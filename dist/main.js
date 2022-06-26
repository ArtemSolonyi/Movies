import { Container } from "inversify";
import { MovieController } from "./controllers/movie.controller";
import { TYPES } from "./types";
import { User } from "./services/user.service";
import { MovieService } from "./services/movie.service";
import { App } from "./app";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
const appContainer = new Container();
appContainer.bind(TYPES.MovieController).to(MovieController);
appContainer.bind(TYPES.AuthController).to(AuthController);
appContainer.bind(TYPES.User).to(User);
appContainer.bind(TYPES.AuthService).to(AuthService);
appContainer.bind(TYPES.MovieService).to(MovieService);
appContainer.bind(TYPES.Application).to(App);
const app = appContainer.get(TYPES.Application);
await app.init();
export { appContainer };
//# sourceMappingURL=main.js.map