var gulp = require('gulp');
var ts = require('gulp-typescript');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('typescript', function () {
	return gulp.src('typescripts/**/*.ts')
		.pipe(ts({
			noImplicitAny: true
		}))
		.pipe(gulp.dest('js/'));
});

gulp.task('dist', ['typescript'], function () {
	return gulp.src(['js/models/*.js'])
		.pipe(concat('crossword.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/'))
		.pipe(gulp.dest('dist/'));
});

gulp.task('default', ['dist']);