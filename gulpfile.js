/**
 * @file: gulp4.0配置，前端工程化
 * @desc: 主要用于添加公共头部以及尾部，js压缩
 * @author: ZHS 
 * @Date: 2019-08-27 14:27:02 
 * @Last Modified by: ZHS
 * @Last Modified time: 2019-09-02 11:06:12
 */

const { src, dest, series, watch, parallel, lastRun } = require('gulp');
const autoprefixer = require('autoprefixer');
const fileinclude = require('gulp-file-include');
const postcss = require('gulp-postcss');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify');
const replace = require('gulp-replace');
const dayjs = require('dayjs');
const gulpclean = require('gulp-clean');
const chalk = require('chalk');
const log = console.log;

log(chalk.green(
    '当前执行环境是: ' +
    chalk.red.bold(process.env.NODE_ENV ? process.env.NODE_ENV : 'development')
));

function isDevelopment() {
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
        return false;
    }
    else {
        return true;
    }
}

function getTimestamp() {
    var timestamp = new Date();
    return isDevelopment()
        ? timestamp.getTime()
        : dayjs().format('YYYY-MM-DD-HH-mm-ss')
}

function images() {
    return src('src/**/*.{png,jpg,gif}')
        .pipe(dest('dist/'));
}

function js() {
    // 不对引入库做处理
    return src(['src/**/*.js', '!src/assets/lib/**/*.js'])
        .pipe(dest('dist/'));
}

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

/**
 * 混淆压缩JS代码，如不需要请不要使用
 */
function uglifyJs() {
    // 不对引入库做处理
    return src(['src/**/*.js', '!src/assets/lib/**/*.js'], { sourcemaps: true })
        .pipe(uglify())
        .pipe(dest('dist/', { sourcemaps: '.' }));
}

/**
 * 监听文件更改
 */
function fileWatch() {
    // 文件第一次修改之后要等待 1000 毫秒才执行关联的任务
    watch('src/**/*.css', { delay: 1000, ignoreInitial: false }, css);
    watch('src/**/*.js', { delay: 1000, ignoreInitial: false }, js);
    watch('src/**/*.html', { delay: 1000, ignoreInitial: false }, html);
    watch('src/**/*.{png,jpg,gif}', { delay: 1000, ignoreInitial: false }, images);
}

/**
 * 清空dist文件夹
 */
function clean() {
    // 这里我们使用一个通配模式来匹配 `dist` 文件夹中的所有东西
    return src('dist/', { read: false, allowEmpty: true })
        .pipe(gulpclean())
}

exports.fileWatch = fileWatch;
exports.clean = clean;
exports.html = html;
exports.default = series(js, css, images, html);
exports.dev = fileWatch;
exports.build = series(clean, parallel(js, css, images, html));
exports.uglifyJs = series(clean, parallel(uglifyJs, css, images, html));
