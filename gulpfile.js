var path = require('path');
var gulp = require('gulp');
var gulpSass = require('gulp-sass');
//var gulpRename = require('gulp-rename');
//var gulpUglify = require('gulp-uglify');
//var gulpDelete = require('del');

/* Convert sass files into css files */
gulp.task('task-css', function() {
    return gulp.src( [path.join(__dirname, '/src/styles/sass/*.scss'),
                      path.join(__dirname, '/libs/normalize.css'),
                      path.join(__dirname, '/libs/font-awesome-4.6.3/css/font-awesome.min.css')] )
               .pipe( gulpSass().on('error', gulpSass.logError) )
               .pipe( gulp.dest(path.join(__dirname, '/src/styles/css/')) );
} );

/* Run the cleaning task only after task.js has been performed.
 */
/*
gulp.task('task-cleaning' , function() {
    return gulpDelete([
        path.join(__dirname, '/frontend/resume/style.css')
    ]);
});
*/

/* All Set! */
gulp.task('default', ['task-css']);
