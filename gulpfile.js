/**
 * Created by dengzhirong on 16.1.4.
 */
var gulp = require('gulp');
// ����Nunjucksģ��
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');

// ����SCSS�ļ�
var sass = require('gulp-sass');
// ѹ��css
var minifycss = require('gulp-minify-css');
// ѹ��js����
var uglify = require('gulp-uglify');
// ���JS
var jshint = require('gulp-jshint');
// �ϲ�js�ļ�
var concat = require('gulp-concat');
// ѹ��ͼƬ
var imagemin = require('gulp-imagemin');
// �������ļ�
var rename = require('gulp-rename');
// ����
var cache = require('gulp-cache');
// ��ֹ gulp �����������ʱ���½����˳��������������־
var plumber = require('gulp-plumber');
// ����֪ͨ
var notify = require('gulp-notify');
// �ϲ�ѩ��ͼ
var spritesmith = require('gulp.spritesmith');



// ����nunjucksģ���ļ�
gulp.task('nunjucks', function() {
    // �������templates�ļ����µ��ļ�
    nunjucksRender.nunjucks.configure(['html/templates/'], {watch: false});
    // ��ȡpage�ļ����µ�.html��.nunjucks�ļ�
    return gulp.src('html/pages/**/*.+(html|nunjucks)')
        // ��ֹ gulp �����������ʱ���½����˳��������������־
        .pipe(plumber())
        // ��ȡdata.json�µ�json����
        .pipe(data(function() {
            return require('./html/data.json')
        }))
        // ��ȾNunjucksģ���ļ�
        .pipe(nunjucksRender())
        // ����Ⱦ���html�ļ������app�ļ�����
        .pipe(gulp.dest('dist/pages'))
        // ������ɺ���console���������
        .pipe(notify({ message: 'styles task complete' }));
});

// ����SCSS�ļ���gulp-sass������CSS����ѹ����gulp-minify-css��
gulp.task('styles', function() {
    return gulp.src('scss/main.scss')
        // ��ֹ gulp �����������ʱ���½����˳��������������־
        .pipe(plumber())
        // ����SCSS�ļ�
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        //���������ļ����.min��׺
        .pipe(rename({ suffix: '.min' }))
        // ѹ��css�ļ�
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'))
        // ������ɺ���console���������
        .pipe(notify({ message: 'styles task complete' }));
});

/*// �ϲ�js�ļ���gulp-concat������ѹ��js���루gulp-uglify��
gulp.task('scripts', function() {
    return gulp.src('src/js/!*.js')
        // ��ֹ gulp �����������ʱ���½����˳��������������־
        .pipe(plumber())
        // ���JS
        .pipe(jshint())
        // �ϲ�JS���뵽main.js�ļ���
        .pipe(concat('main.js'))
        // ����ϲ����main.js
        .pipe(gulp.dest('dist/js'))
        //���ļ����.min��׺����main.min.js
        .pipe(rename({ suffix: '.min' }))
        // ѹ��JS�ļ�
        .pipe(uglify())
        // ���main.min.js
        .pipe(gulp.dest('dist/js'))
        // ������ɺ���console���������
        .pipe(notify({ message: 'scripts task complete' }));
});*/

// ѹ��ͼƬ��gulp-imagemin��
gulp.task('images', function() {
    return gulp.src('images/*')
        // ��ֹ gulp �����������ʱ���½����˳��������������־
        .pipe(plumber())
        // ͼƬ��Сѹ��
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        // ���ѹ�����ͼƬ
        .pipe(gulp.dest('dist/images'))
        // ������ɺ���console���������
        .pipe(notify({ message: 'images task complete' }));
});

// �ϲ�ѩ��ͼ
gulp.task('sprite', function () {
    var spriteData = gulp.src('images/icon/*')
        .pipe(spritesmith({
        // ѩ��ͼ����
        imgName: 'sprite.png',
        // scss�ļ�����֧�ֵ���չ����SASS��CSS��LESS��JSON��
        cssName: '_sprite.scss',
        // css��ʽ
        cssFormat: 'scss',
        // �㷨
        algorithm: 'top-down',
        /* // css class �����淶
        cssVarMap: function(sprite) {
            sprite.name = sprite.name
        },*/
        // CSS�ļ���·��
        imgPath: 'dist/images/',
        // ѩ��ͼ֮��ļ��
        padding: 0,

        /* // ͼƬ������
        //imgOpts: {quality: 75}, */

/*         // ����ͼƬĿ¼����@2x.png�Ķ���ͼ��������ϲ���sprite@2x.png
         retinaSrcFilter: ['app/images/!*@2x.png'],
         retinaImgName: 'sprite@2x.png',*/
        // ����CSS������ģ����ʽ
        cssTemplate: 'scss.template.mustache'
    }));
    // ����ϲ����ѩ��ͼ�����·��
    spriteData.img.pipe(gulp.dest("dist/images/"));
    // ����ѩ��ͼ��scss�ļ������·��
    spriteData.css.pipe(gulp.dest("scss/sprite/"));
});



// Default task��ͬʱ�������task
gulp.task('default', function() {
    gulp.start('sprite', 'images', 'nunjucks', 'styles');
});

// �����ļ��޸�
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