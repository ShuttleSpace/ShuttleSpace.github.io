import gulp from "gulp";
import cleanCSS from "gulp-clean-css";
import uglify from "gulp-uglify";
import htmlmin from "gulp-htmlmin";
import htmlclean from "gulp-htmlclean";
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from "gulp-imagemin";
import babel from "gulp-babel";

// 压缩css文件
gulp.task("minify-css", (done) => {
  gulp
    .src("./public/**/*.css")
    .pipe(cleanCSS())
    .on("error", (e) => done(e))
    .pipe(gulp.dest("./public"))
    .on("error", (e) => done(e));
  done();
});

// 压缩html文件
gulp.task("minify-html", (done) => {
  gulp
    .src("./public/**/*.html")
    .pipe(htmlclean())
    .pipe(
      htmlmin({
        continueOnParseError: true,
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      })
    )
    .on("error", (e) => done(e))
    .pipe(gulp.dest("./public"));
  done();
});

// 压缩js文件
gulp.task("minify-js", (done) => {
  gulp
    .src(["./public/**/*.js", "!./public/**/*.min.js"])
    .pipe(
      babel({
        //将ES6代码转译为可执行的JS代码
        // presets: ['es2015'] // es5检查机制
        presets: ["@babel/preset-env"],
      })
    )
    .on("error", (e) => done("babel: " + e))
    .pipe(uglify())
    .on("error", (e) => done("uglify: " + e))
    .pipe(gulp.dest("./public"));
  done();
});
// 压缩 public/images 目录内图片(Version>3)
gulp.task("minify-images", done => {
  gulp
    .src("./public/img/*")
    .pipe(
      imagemin([mozjpeg(), optipng(), svgo()], { verbose: true }) // gifsicle will cause WritableStream Error.
    )
    .on("error", (e) => done(e))
    .pipe(gulp.dest("./public/img"));
  done();
});

//4.0以前的写法
//gulp.task('default', ['minify-html', 'minify-css', 'minify-js', 'minify-images'])
//4.0以后的写法
// 执行 gulp 命令时执行的任务
gulp.task(
  "default",
  gulp.parallel("minify-html", "minify-css", "minify-js", "minify-images")
);
