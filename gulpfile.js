const gulp = require('gulp');
const gzip = require('gulp-gzip');

gulp.task('compress', () => {
  return gulp.src(['./dist/**/*.*'])
      .pipe(gzip())
      .pipe(gulp.dest('./dist'));
});
