import webpack from "webpack-stream";

export const js = () => {
  return app.gulp
    .src(app.path.src.js, { sourcemaps: false })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "JavaScript",
          message: "Error: <%=error.message %>",
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.js, { sourcemaps: false }))
    .pipe(app.plugins.browserSync.stream());
};
