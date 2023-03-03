import gulp from "gulp";
import autoprefixer from "gulp-autoprefixer";
import cleanCss from "gulp-clean-css";
import cssmin from "gulp-cssmin";
import gulpSass from "gulp-sass";
import dartSass from "sass";

const sass = gulpSass(dartSass);
function build(done) {
  gulp
    .src("./styles/index.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCss())
    .pipe(cssmin())
    .pipe(gulp.dest("./dist/styles"));

  done();
}

export const dev = (done) => {
  const watcher = gulp.watch("./styles/*.scss", (cb) => {
    build(cb);
  });
  watcher.on("change", (event) => {
    console.log(`File ${event.path} was ${event.type}, running tasks...`);
  });

  done();
};

export default build;
