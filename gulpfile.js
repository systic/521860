var gulp = require('gulp');
var gulpif = require('gulp-if');
var spritesmith = require('gulp.spritesmith');


gulp.task('sprites', function() {
	var spriteData = gulp.src('src/assets/img/icons/**/*.{png,jpg}').pipe(spritesmith({
		retinaSrcFilter: [ 'src/assets/img/icons/**/*@2x.{png,jpg}'],
		imgName: 'sprite.png',
		retinaImgName: 'sprite@2x.png',
		cssName: 'sprite.css'
	}));
	return spriteData.pipe(gulp.dest('src/assets/img/sprites'));
});

gulp.task('watch', [ 'sprites' ], function() {
	gulp.watch('src/assets/img/icons/**/*.{png,jpg}', [ 'sprites' ]);
});
