const gulp = require('gulp');

const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');


// gulp contains task which needs to be created, we create tasks which run
// one task is minifying the css
gulp.task('css', function(done) {
    console.log('minifying css..');
    // ** means any folder & every folder, * subfolder inside it
    gulp.src('./assets/sass/**/*.scss')
    // it need to be passed through gulp sass model, these are now converted to css
    // pipe is basically a func which is calling all these sub middlewares which are there with the gulp
    .pipe(sass())
    // compressing them
    .pipe(cssnano())
    // put them in a folder
    .pipe(gulp.dest('./assets/css'));

    // changing the naming convention
    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        // current working dir
        cwd: 'public',
        // if a name already exists it will not change it, it will merge with the existing file
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
       done();
});


gulp.task('js', function(done) {
    console.log('minifying js..');
    
    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        // current working dir
        cwd: 'public',
        // if a name already exists it will not change it, it will merge with the existing file
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


gulp.task('images', function(done) {
    console.log('minifying images..');
    // regex
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        // current working dir
        cwd: 'public',
        // if a name already exists it will not change it, it will merge with the existing file
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


// empty the public/assets directory
gulp.task('clean:assets', function(done) {
    del.sync('./public/assets');
    done();
});

// when building a project clear the previous build and build it from scratch
gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done) {
    console.log('Building assets');
    done();
})