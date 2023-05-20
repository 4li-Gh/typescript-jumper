import gulp from 'gulp';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import tsify from "tsify";
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import buffer from 'vinyl-buffer';

gulp.task(
    "default",
    function () {
        return browserify({
            basedir: ".",
            debug: true,
            entries: ["src/main.ts"],
            cache: {},
            packageCache: {},
        })
            .plugin(tsify)
            .bundle()
            .pipe(source("game.js"))
            .pipe(buffer())
            // .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(uglify())
            .pipe(sourcemaps.write("./"))
            .pipe(gulp.dest("dist"));
    }
);
