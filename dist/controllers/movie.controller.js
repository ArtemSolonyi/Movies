var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class MovieController {
    constructor(movieService) {
        this.createMovie = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.movie.createMovie(req.body);
            if (!result) {
                return res.status(500).json({ "message": "Failed to create movie" });
            }
            return res.status(200).json({ "result": result });
        });
        this.updateMovie = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.movie.updateMovie(req, res);
            if (!result) {
                return res.status(500).json({ "message": "Failed to update movie" });
            }
            return result;
        });
        this.getMovie = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.movie.getMovie(req, res);
            if (!result) {
                return res.status(500).json({ "message": "Failed to receive movie" });
            }
            return result;
        });
        this.deleteMovie = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.movie.deleteMovie(req, res);
            if (!result) {
                return res.status(500).json({ "message": "Failed to delete movie" });
            }
            return result;
        });
        this.movie = movieService;
    }
}
