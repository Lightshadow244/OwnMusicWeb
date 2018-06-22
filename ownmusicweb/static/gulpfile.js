var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');

gulp.task('minify-css', function() {
 return gulp.src('/home/user/OwnMusicWeb/ownmusicweb/static/css/*.css')
  .pipe(minifycss())
  .pipe(gulp.dest('/home/user/OwnMusicWeb/ownmusicweb/static/build/css/'))
});

gulp.task('uglify', function() {
 return gulp.src('/home/user/OwnMusicWeb/ownmusicweb/static/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('/home/user/OwnMusicWeb/ownmusicweb/static/build/js/'))
});

gulp.task('minify', ['minify-css', 'uglify']);
