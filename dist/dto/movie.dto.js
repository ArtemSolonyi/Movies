var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";
export class MovieDto {
}
__decorate([
    MinLength(1, { each: true }),
    MaxLength(40, { each: true }),
    IsString(),
    __metadata("design:type", String)
], MovieDto.prototype, "title", void 0);
__decorate([
    MinLength(1, { each: true }),
    MaxLength(200, { each: true }),
    IsString(),
    __metadata("design:type", String)
], MovieDto.prototype, "description", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], MovieDto.prototype, "category", void 0);
export class FilesOfMovieDto {
}
export class updateMovieDto extends MovieDto {
}
export class getCategoriesMovie {
}
__decorate([
    IsOptional(),
    MinLength(1, { each: true }),
    __metadata("design:type", String)
], getCategoriesMovie.prototype, "category", void 0);
export class setRatingMovieDto {
}
__decorate([
    IsOptional(),
    __metadata("design:type", String)
], setRatingMovieDto.prototype, "movieId", void 0);
__decorate([
    IsOptional(),
    __metadata("design:type", String)
], setRatingMovieDto.prototype, "userId", void 0);
__decorate([
    IsOptional(),
    __metadata("design:type", Number)
], setRatingMovieDto.prototype, "rating", void 0);
//# sourceMappingURL=movie.dto.js.map