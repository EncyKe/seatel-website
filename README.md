## һ. ��վĿ¼�ṹ

```
|--seatel/
    |--dist/���Զ����ɵ�Ŀ¼�������汾��
        |-- css/
        |-- images/
            |-- icon/���Զ����ɵ�ѩ��ͼ��
        |-- js/����վ��JS�ļ���
        |-- pages/��������ɵ�html�ļ���
    |--html/
        |-- pages/��ҳ��ģ�壩
        |-- templates/��ģ���ļ���
        |-- data.json/��ҳ�����ݣ�
    |--images/
        |-- icon/��ѩ��ͼԴͼ�꣩
    |--scss/��.scss��ԭʼ�ļ���
        |-- func/��SASS������
        |-- init/��reset��ʽ��ȫ�ֶ�����ʽ��
        |-- mixin/
        |-- sprite/��ѩ��ͼ�Զ����ɵ��ļ���
        |-- var/����ʼ��������
        |-- widget/�������ʽ��
    |-- node_modules���������ļ���
    |--test/������Ŀ¼��
    |-- gulpfile.js��gulp������Ϣ��
    |-- package.json
    |-- scss.template.mustache��spritesmith�ϲ�ѩ��ͼ��cssģ���ļ���
    
```

## ��. ��ʼ

```
npm install
```

��Ҫ��װ�Ĳ���У�

gulp, gulp-nunjucks-render, gulp-data, gulp-sass, gulp-minify-css, gulp-uglify, gulp-jshint, gulp-concat, gulp-imagemin, gulp-rename, gulp-cache, gulp-plumber, gulp-notify, gulp.spritesmith��

## ��. ��Ŀʵ��

ÿ���ļ������ֻ꣬��Ҫ�������й��������룺

```
$ gulp
```

����ͬʱ���scss���롢cssѹ����ͼƬѹ����ѩ��ͼ�ϲ���Nunjucksģ��������롣

### 3.1 ��������ִ�У�

1. SCSS���뼰CSS����ѹ����`$ gulp styles`��

2. ͼƬѹ����`$ gulp images`��

3. ѩ��ͼ�ϲ���`$ gulp sprite`��

4. Nunjucksģ��������룺`$ gulp nunjucks`��

### 3.2 �����ļ����ģ�

```
gulp watch
```