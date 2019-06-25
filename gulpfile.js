//定义gulp插件
const [gulp, clean, rename, del, less] = [
  require("gulp"),
  require("gulp-clean"),
  require("gulp-rename"),
  require("del"),
  require("gulp-less")
];

//==========================
//  严格限定目录结构
//==========================

const srcPath = "src/",
  distPath = "dist/",
  wxmlPath = [`${srcPath}pages/**/*.wxml`, `${srcPath}components/**/*.wxml`],
  lessPath = [`${srcPath}pages/**/*.less`, `${srcPath}components/**/*.less`],
  rootlessPath = [`${srcPath}*.less`, `!${srcPath}variable.less`],
  jsPath = [`${srcPath}pages/**/*.js`, `${srcPath}components/**/*.js`],
  jsonPath = [`${srcPath}pages/**/*.json`, `${srcPath}components/**/*.json`],
  envUtilsPath = [`${srcPath}env/*.js`, `${srcPath}utils/*.js`];

//清理文件夹
gulp.task("clean", () => {
  return gulp.src(`./${distPath}*`).pipe(clean());
});

//==========================
//   对应getStart.md中的要求
//==========================

//页面 wxml
const page_wxml = () => {
  return gulp.src(wxmlPath, { base: srcPath }).pipe(gulp.dest(distPath));
};
gulp.task(page_wxml);

//页面 less
const page_less = () => {
  return gulp
    .src([...lessPath, ...rootlessPath], { base: srcPath })
    .pipe(less())
    .pipe(
      rename({
        extname: ".wxss"
      })
    )
    .pipe(gulp.dest(distPath));
};
gulp.task(page_less);

//页面 js
const page_js = () => {
  return gulp.src(jsPath, { base: srcPath }).pipe(gulp.dest(distPath));
};
gulp.task(page_js);

//页面 json
const page_json = () => {
  return gulp.src(jsonPath, { base: srcPath }).pipe(gulp.dest(distPath));
};
gulp.task(page_json);

// env/utils 文件夹中的插件 --暂不考虑压缩
const env_utils = () => {
  return gulp.src(envUtilsPath, { base: srcPath }).pipe(gulp.dest(distPath));
};
gulp.task(env_utils);

// static文件夹 与 根目录
const staticFontPath = [`${srcPath}static/font/*`],
  staticJsPath = [`${srcPath}static/js/*`, `${srcPath}static/js/*/**`],
  staticImagePath = [
    `${srcPath}static/image/*.{png,jpg,jpeg,gif,ico,svg}`,
    `${srcPath}static/image/**/*.{png,jpg,jpeg,gif,ico,svg}`
  ],
  root_files = [`${srcPath}*`, `!${srcPath}*.less`];

const static_copy = () => {
  return gulp
    .src(
      [...staticFontPath, ...staticJsPath, ...staticImagePath, ...root_files],
      {
        base: srcPath
      }
    )
    .pipe(gulp.dest(distPath));
};
gulp.task(static_copy);

//template模板文件
const templateWxmlPath = [`${srcPath}template/*/**.wxml`],
  templateLessPath = [`${srcPath}template/*/**.less`];
const template_wxml = () => {
  return gulp
    .src([...templateWxmlPath], { base: srcPath })
    .pipe(gulp.dest(distPath));
};
gulp.task(template_wxml);

const template_less = () => {
  return gulp
    .src([...templateLessPath], { base: srcPath })
    .pipe(less())
    .pipe(
      rename({
        extname: ".wxss"
      })
    )
    .pipe(gulp.dest(distPath));
};

gulp.task(template_less);

//打包
gulp.task(
  "build",
  gulp.series(
    "clean",
    gulp.parallel(
      "template_wxml",
      "template_less",
      "page_wxml",
      "page_less",
      "page_js",
      "page_json",
      "env_utils",
      "static_copy"
    )
  )
);

//监听
gulp.task("watch", () => {
  gulp.watch(wxmlPath, page_wxml);
  gulp.watch([...lessPath, ...rootlessPath], page_less);
  gulp.watch(jsPath, page_js);
  gulp.watch(jsonPath, page_json);
  gulp.watch(envUtilsPath, env_utils);
  gulp.watch([...templateLessPath], template_less);
  gulp.watch([...templateWxmlPath], template_wxml);
  gulp.watch(
    [...staticFontPath, ...staticJsPath, ...staticImagePath, ...root_files],
    static_copy
  );
});
