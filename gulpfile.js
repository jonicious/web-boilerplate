var gulp = require("gulp");
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var cssmin = require("gulp-cssmin");
var notify = require("gulp-notify");

/*
 * Opens a webserver (usually localhost:3000) and runs the site.
 */

gulp.task("browser-sync", function () {
    browserSync({
        server: {
            baseDir: "./dist"
        }
    });
});

/*
 * Takes script.js file, minifies and concatinates it and saves it to dist folder.
 */

gulp.task("js", function () {
    gulp.src("./src/js/script.js")
        .pipe(concat("script.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js/"))
        .pipe(reload({stream: true}));
});

// Compiles your selected scss file, autoprefixes and minifies it and saves it to dist folder.

gulp.task("scss", function () {
    gulp.src(["./src/scss/style.scss"])
        .pipe(sass({
            onError: function (err) {
                return notify().write(err);
            }
        }))
        .pipe(autoprefixer("last 2 version", "ie 9"))
        .pipe(cssmin())
        .pipe(gulp.dest("./dist/css/"))
        .pipe(reload({stream: true}));
});