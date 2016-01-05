## 一. 网站目录结构

```
|--seatel/
    |--dist/（自动生成的目录，发布版本）
        |-- css/
        |-- images/
            |-- icon/（自动生成的雪碧图）
        |-- js/（网站的JS文件）
        |-- pages/（最后生成的html文件）
    |--html/
        |-- pages/（页面模板）
        |-- templates/（模板文件）
        |-- data.json/（页面数据）
    |--images/
        |-- icon/（雪碧图源图标）
    |--scss/（.scss的原始文件）
        |-- func/（SASS函数）
        |-- init/（reset样式与全局定义样式）
        |-- mixin/
        |-- sprite/（雪碧图自动生成的文件）
        |-- var/（初始化变量）
        |-- widget/（组件样式）
    |-- node_modules（依赖包文件）
    |--test/（测试目录）
    |-- gulpfile.js（gulp配置信息）
    |-- package.json
    |-- scss.template.mustache（spritesmith合并雪碧图的css模板文件）
    
```

## 二. 开始

```
npm install
```

需要安装的插件有：

gulp, gulp-nunjucks-render, gulp-data, gulp-sass, gulp-minify-css, gulp-uglify, gulp-jshint, gulp-concat, gulp-imagemin, gulp-rename, gulp-cache, gulp-plumber, gulp-notify, gulp.spritesmith。

## 三. 项目实践

每次文件更改完，只需要在命令行工具中输入：

```
$ gulp
```

即可同时完成scss编译、css压缩、图片压缩、雪碧图合并、Nunjucks模板引擎编译。

### 3.1 单独任务执行：

1. SCSS编译及CSS代码压缩：`$ gulp styles`；

2. 图片压缩：`$ gulp images`；

3. 雪碧图合并：`$ gulp sprite`；

4. Nunjucks模板引擎编译：`$ gulp nunjucks`；

### 3.2 监视文件更改：

```
gulp watch
```