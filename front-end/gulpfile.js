const gulp = require('gulp');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');

function compile(){
	return(
    gulp.src('./assets/sass/*.sass')
        .pipe(sassGlob())
        .pipe(sass({outputStyle:'compressed'}))
        //.pipe(sass({outputStyle: 'expanded', sourceComments: true}))
		//.pipe(gulp.dest('./assets/css/'))
        .pipe(gulp.dest('../public/assets/css/'))

	)
}
exports.compile = compile;

function watchfiles(){
	gulp.watch('./assets/sass/**', compile);
}
const watch = gulp.parallel(watchfiles)
exports.watch = watch;
