# gulp项目配置

该配置基于NodeJs以及gulp，需安装相应的环境，最新的NodeJs即可

```markdown
NodeJs > 8
```

编辑器建议使用vscode，同时搭配Live Server插件，可以达到热刷新的效果

Live Server，默认host为127.0.0.1，可以在vscode中修改本机的IP地址，这样方便调试

## 使用

```node
# 安装所需的npm包
npm install

# 开发环境
npm run dev

# 生产环境，文件打包至dist文件夹
npm run build

# 如需压缩js
npm run build:uglify

# 清空dist文件夹
npm run clean
```

## 项目结构

```tree
gulp-config                                    // 项目名称
├─ .browserslistrc                             // css兼容配置
├─ .gitignore                                  //
├─ node_modules                                // npm包
├─ dist                                        // 生产环境文件
├─ gulpfile.js                                 // gulp配置文件
├─ LICENSE                                     //
├─ package-lock.json                           //
├─ package.json                                // npm包版本管理
├─ README.md                                   // 说明文档
└─ src                                         //
   ├─ assets                                   // 静态文件
   │  ├─ css                                   // css
   │  │  └─ common.css                         // 公共css
   │  ├─ img                                   // 图片
   │  ├─ js                                    // 公共js
   │  └─ lib                                   // 第三方js库
   ├─ include                                  // 公共头部，底部，和内容
   │  ├─ com_body.html                         //
   │  ├─ com_bottom.html                       //
   │  └─ com_head.html                         //
   └─ views                                    // 页面文件夹
      └─ hello-world                           // 某个页面
         ├─ css                                //
         │  └─ index.css                       //
         ├─ index.html                         //
         └─ js                                 //
            └─ index.js                        //
```

## css处理

css只做了浏览器兼容处理，并没有使用压缩功能，如要使用，可以使用`gulp-csso`进行处理

```javascript
/**
 * css添加浏览器兼容
 */
function css() {
    let plugins = [
        autoprefixer()
    ];
    return src('src/**/*.css')
        .pipe(postcss(plugins))
        .pipe(dest('dist/'));
}
```

## js处理

开发环境和生产环境使用的不同方法，根据具体情况决定是否使用js混淆压缩

```javascript
/**
 * 未做混淆压缩，开发使用
 */
function js() {
    return src('src/**/*.js')
        .pipe(dest('dist/'));
}

/**
 * 混淆压缩JS代码，如不需要请不要使用
 * 如果只需要压缩，不需要sourcemaps，去除掉sourcemaps选项即可
 */
function uglifyJs() {
    return src('src/**/*.js', { sourcemaps: true })
        .pipe(uglify())
        .pipe(dest('dist/', { sourcemaps: '.' }));
}
```

## 图片处理

现在未对图片做压缩处理

```javascript
function images() {
    return src('src/**/*.{png,jpg,gif}')
        .pipe(dest('dist/'));
}
```

如需要使用图片压缩，自己使用`gulp-imagemin`实现即可

```bash
# 文档地址: https://github.com/sindresorhus/gulp-imagemin

# 安装插件
npm install --save-dev gulp-imagemin
```

```javascript
# gulpfile.js
...
const imagemin = require('gulp-imagemin');
···

function images() {
    return src('src/**/*.{png,jpg,gif}')
        .pipe(imagemin())
        .pipe(dest('dist/'))
}
```

## html处理

```javascript
function getTimestamp() {
    var timestamp = new Date();
    return isDevelopment()
        ? timestamp.getTime()
        : dayjs().format('YYYY-MM-DD-HH-mm-ss')
}

/**
 * html页面添加公共头部和尾部，以及添加时间戳或版本戳
 * 开发环境为时间戳，生产环境为日期戳
 */
function html() {
    return src(['src/**/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(replace('@version', 'v=' + getTimestamp()))
        .pipe(dest('dist/'));
}
```
