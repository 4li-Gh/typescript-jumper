import gulp from 'gulp';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import tsify from "tsify";
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import buffer from 'vinyl-buffer';
import browserSync from 'browser-sync';


function typescript() {
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
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream());
}

function html() {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream());
}

gulp.task('server', () => {
    browserSync.init({
        server: {
            baseDir: './dist',
        },
        port: 3000,
    });

    gulp.watch('./src/**/*.ts', typescript);
    gulp.watch('./src/index.html', html);
});

gulp.task('default', gulp.series(typescript, html, 'server'));
