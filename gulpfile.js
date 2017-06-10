var gulp = require("gulp");
var rev = require("gulp-rev");//作用是文件版本维护，方式是在文件名中带上哈希码，当文件更新后更新哈希码
var revReplace = require("gulp-rev-replace");//相应于上面的，当带哈希的文件名更新后，这个插件的作用就是将别的文件中对应的引用更新
var useref = require("gulp-useref");//通过使用特定格式的注释，起到设置的作用，比如文件合并
var filter = require("gulp-filter");//筛选恢复文件
var uglify = require("gulp-uglify");//压缩js代码
var csso = require("gulp-csso");//压缩css代码
gulp.task("default",function(){
    var jsFilter = filter('**/*.js',{restore : true});
    var cssFilter =  filter('**/*.css',{restore : true});
    var indexHtmlFilter = filter(['**/*','!**/index.html'],{restore : true});

    return gulp.src('src/index.html')
        .pipe(useref())
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest('dist'));
});