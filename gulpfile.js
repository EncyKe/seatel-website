/**
 * Created by dengzhirong on 16.1.4.
 */
var gulp = require('gulp');
// 编译Nunjucks模板
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');

// 编译SCSS文件
var sass = require('gulp-sass');
// 压缩css
var minifycss = require('gulp-minify-css');
// 压缩js代码
var uglify = require('gulp-uglify');
// 检查JS
var jshint = require('gulp-jshint');
// 合并js文件
var concat = require('gulp-concat');
// 压缩图片
var imagemin = require('gulp-imagemin');
// 重命名文件
var rename = require('gulp-rename');
// 缓存
var cache = require('gulp-cache');
// 阻止 gulp 插件发生错误时导致进程退出，并输出错误日志
var plumber = require('gulp-plumber');
// 更动通知
var notify = require('gulp-notify');
// 合并雪碧图
var spritesmith = require('gulp.spritesmith');



// 编译nunjucks模板文件
gulp.task('nunjucks', function() {
    // 定义监听templates文件夹下的文件
    nunjucksRender.nunjucks.configure(['html/templates/'], {watch: false});
    // 获取page文件夹下的.html和.nunjucks文件
    return gulp.src('html/pages/**/*.+(html|nunjucks)')
        // 阻止 gulp 插件发生错误时导致进程退出，并输出错误日志
        .pipe(plumber())
        // 获取data.json下的json数据
        .pipe(data(function() {
            return require('./html/data.json')
        }))
        // 渲染Nunjucks模板文件
        .pipe(nunjucksRender())
        // 将渲染后的html文件输出到app文件夹下
        .pipe(gulp.dest('dist/pages'))
        // 任务完成后，在console中输出提醒
        .pipe(notify({ message: 'styles task complete' }));
});

// 编译SCSS文件（gulp-sass），及CSS代码压缩（gulp-minify-css）
gulp.task('styles', function() {
    return gulp.src('scss/main.scss')
        // 阻止 gulp 插件发生错误时导致进程退出，并输出错误日志
        .pipe(plumber())
        // 编译SCSS文件
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        //给编译后的文件添加.min后缀
        .pipe(rename({ suffix: '.min' }))
        // 压缩css文件
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'))
        // 任务完成后，在console中输出提醒
        .pipe(notify({ message: 'styles task complete' }));
});

/*// 合并js文件（gulp-concat），并压缩js代码（gulp-uglify）
gulp.task('scripts', function() {
    return gulp.src('src/js/!*.js')
        // 阻止 gulp 插件发生错误时导致进程退出，并输出错误日志
        .pipe(plumber())
        // 检查JS
        .pipe(jshint())
        // 合并JS代码到main.js文件中
        .pipe(concat('main.js'))
        // 输出合并后的main.js
        .pipe(gulp.dest('dist/js'))
        //给文件添加.min后缀，即main.min.js
        .pipe(rename({ suffix: '.min' }))
        // 压缩JS文件
        .pipe(uglify())
        // 输出main.min.js
        .pipe(gulp.dest('dist/js'))
        // 任务完成后，在console中输出提醒
        .pipe(notify({ message: 'scripts task complete' }));
});*/

// 压缩图片（gulp-imagemin）
gulp.task('images', function() {
    return gulp.src('images/*')
        // 阻止 gulp 插件发生错误时导致进程退出，并输出错误日志
        .pipe(plumber())
        // 图片大小压缩
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        // 输出压缩后的图片
        .pipe(gulp.dest('dist/images'))
        // 任务完成后，在console中输出提醒
        .pipe(notify({ message: 'images task complete' }));
});

// 合并雪碧图
gulp.task('sprite', function () {
    var spriteData = gulp.src('images/icon/*')
        .pipe(spritesmith({
        // 雪碧图名称
        imgName: 'sprite.png',
        // scss文件名（支持的扩展名有SASS、CSS、LESS、JSON）
        cssName: '_sprite.scss',
        // css格式
        cssFormat: 'scss',
        // 算法
        algorithm: 'top-down',
        /* // css class 命名规范
        cssVarMap: function(sprite) {
            sprite.name = sprite.name
        },*/
        // CSS文件的路径
        imgPath: 'dist/images/',
        // 雪碧图之间的间距
        padding: 0,

        /* // 图片的质量
        //imgOpts: {quality: 75}, */

/*         // 查找图片目录中以@2x.png的二倍图，并将其合并到sprite@2x.png
         retinaSrcFilter: ['app/images/!*@2x.png'],
         retinaImgName: 'sprite@2x.png',*/
        // 定义CSS的生成模板样式
        cssTemplate: 'scss.template.mustache'
    }));
    // 定义合并后的雪碧图的输出路径
    spriteData.img.pipe(gulp.dest("dist/images/"));
    // 定义雪碧图的scss文件的输出路径
    spriteData.css.pipe(gulp.dest("scss/sprite/"));
});



// Default task：同时启动多个task
gulp.task('default', function() {
    gulp.start('sprite', 'images', 'nunjucks', 'styles');
});

// 监听文件修改
gulp.task('watch', function() {
    // Watch sprite files
    gulp.watch('images/icon/*', ['sprite']);
/*    // Watch .js files
    gulp.watch('js/!*.js', ['scripts']);*/
    // Watch image files
    gulp.watch('images/*', ['images']);
    // Watch nunjucks files
    gulp.watch('html/*', ['nunjucks']);
    // Watch .scss files
    gulp.watch('scss/*.scss', ['styles']);
});