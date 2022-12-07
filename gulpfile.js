// Основной модуль
import gulp from "gulp";

// Импорт путей
import { path } from "./gulp/config/path.js";

// Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";

// Передаем значения в глобальную переменную app
global.app = {
  path: path,
  gulp: gulp,
  plugins: plugins,
};

// Импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { font } from "./gulp/tasks/font.js";

// Наблюдатель за изменениями в файлах
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

// Основные задачи
const mainTasks = gulp.parallel(copy, html, scss, js, images, font);

// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
// Выполнение сценария по умолчанию
gulp.task("default", dev);

// -------------------------------------------
// экспорт задач
gulp.task("copy", copy);
gulp.task("reset", reset);
gulp.task("html", html);
gulp.task("dev", dev);
gulp.task("scss", scss);
gulp.task("js", js);
gulp.task("images", images);
gulp.task("font", font);

// gulp.task("watcher", watcher);
