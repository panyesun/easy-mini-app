//定义gulp插件
const [gulp, clean, rename, del, less] =
    [
        require('gulp'),
        require('gulp-clean'),
        require('gulp-rename'),
        require('del'),
        require('gulp-less'),
    ];

//定义全局变量 
const distRoot = 'dist/',
    srcRoot = 'src/',
    lessFiles = [`${srcRoot}**/*.less`],
    wxmlFiles = [`${srcRoot}**/*.wxml`],
    jsFiles = [`${srcRoot}**/*.js`],
    jsonFiles = [`${srcRoot}**/*.json`],
    imgFiles = [`${srcRoot}static/**/*.{png,jpg,jpeg,gif,ico}`];

//wxss
const wxss = () => {
    return gulp.src(lessFiles)
        .pipe(less())
        .pipe(rename({ extname: '.wxss' }))
        .pipe(gulp.dest(distRoot));
}
gulp.task(wxss);

//wxml
const wxml = () => {
    return gulp.src(wxmlFiles)
        .pipe(gulp.dest(distRoot));
}
gulp.task(wxml)

//js
const js = () => {
    return gulp.src(jsFiles)
        .pipe(gulp.dest(distRoot));
}
gulp.task(js)

//json
const json = () => {
    return gulp.src(jsonFiles)
        .pipe(gulp.dest(distRoot));
}
gulp.task(json)

const img = () => {
    return gulp.src(imgFiles,{base:srcRoot})
        .pipe(gulp.dest(distRoot))
}
gulp.task(img);

//清理文件夹
gulp.task('clean', (done) => {
    gulp.src(`./${distRoot}*`).pipe(clean());
    done();
})

//全局复制
gulp.task('copy', done => {
    gulp.src(['src/**/*', '!src/**/*.less'])
        .pipe(gulp.dest(distRoot));
    done();
})
//将模板中的wxss转为less
gulp.task('rename', done => {
    gulp.src(['src/**/*.wxss'])
        .pipe(rename({ extname: '.less' }))
        .pipe(gulp.dest(srcRoot))
    // del.sync(['src/**/*.wxss']);
    done();
})

gulp.task('default', gulp.series('copy', 'wxss','img'));

gulp.task('watch', () => {
    gulp.watch(lessFiles,wxss);
    gulp.watch(wxmlFiles,wxml);
    gulp.watch(jsFiles,js);
    gulp.watch(jsonFiles,json);
    gulp.watch(imgFiles,img);
})

gulp.task('build',gulp.series('clean','copy','wxss','img'))