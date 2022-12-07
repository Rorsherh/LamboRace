// import gulpPlumber from "gulp-plumber";
// import { notify } from "gulp-notify";
import newer from "gulp-newer";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const font = () => {
  return app.gulp
    .src(app.path.src.font)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "Font",
          message: "Error: <%=error.message %>",
        })
      )
    )
    .pipe(newer(app.path.build.font))
    .pipe(
      fonter({
        formats: ["ttf", "woff", "eot", "svg"],
      })
    )
    .pipe(app.gulp.dest(app.path.build.font))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(app.path.build.font));
};
