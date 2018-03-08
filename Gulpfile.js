const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');

// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del('dist/**/*');
});

// TypeScript compile
gulp.task('compile', ['clean'], function () {
  return gulp
    .src('app/**/*.ts')
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(gulp.dest('dist/app'));
});

// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', ['clean'], function() {
  return gulp.src(['app/**/*', 'index.html', 'styles.css', '!app/**/*.ts'], { base : './' })
    .pipe(gulp.dest('dist'))
});

// lint TypeScript files with tslint before compilation
gulp.task('tslint', function() {
  return gulp.src('app/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});

// gulp.task('compile', ['clean'], function () {
//   return gulp
//     .src(tscConfig.files)
//     .pipe(sourcemaps.init())          // <--- sourcemaps
//     .pipe(typescript(tscConfig.compilerOptions))
//     .pipe(sourcemaps.write('.'))      // <--- sourcemaps
//     .pipe(gulp.dest('dist/app'));
// });

gulp.task('build', ['tslint', 'compile', 'copy:libs', 'copy:assets']);
gulp.task('default', ['build']);
