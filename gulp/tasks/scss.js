import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";

import cleanCss from "gulp-clean-css"; // Сжатие css
import webpcss from "gulp-webp-css"; // Вывод WEBP изображениц
import autoPrefixer from "gulp-autoprefixer"; // Добавление вендорных префиксов
import groupCssMediaQueries from "gulp-group-css-media-queries"; // групировка медиа запросов

const sass = gulpSass(dartSass);

export const scss = () => {
  return app.gulp
    .src(app.path.src.scss, { sourcemaps: false })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SCSS",
          message: "Error: <%=error.message %>",
        })
      )
    )
    .pipe(
      sass({
        outputStyle: "expanded",
      })
    )
    .pipe(app.plugins.replace(/@img\//g, "../img/"))
    .pipe(groupCssMediaQueries())
    .pipe(webpcss())
    .pipe(
      autoPrefixer({
        grid: true,
        overrideBrowserlist: ["last 3 versions"],
        cascade: true,
      })
    )
    .pipe(app.gulp.dest(app.path.build.css, { sourcemaps: false }))
    .pipe(cleanCss())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(app.gulp.dest(app.path.build.css, { sourcemaps: false }))
    .pipe(app.plugins.browserSync.stream());
};
