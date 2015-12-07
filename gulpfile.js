var gulp         = require('gulp'),
  postcss      = require('gulp-postcss'),
  sass         = require('gulp-sass'),
  autoprefixer = require('autoprefixer'),
  concat       = require('gulp-concat'),
  browserSync  = require('browser-sync').create(),
  selectors    = require('postcss-custom-selectors'),
  spritesmith  = require('gulp.spritesmith'),
  plumber      = require('gulp-plumber'),
  notify       = require("gulp-notify"),
  merge        = require('merge-stream');

/*------------------------------------*\
    Sass
\*------------------------------------*/

gulp.task('sass', function() {
  var processors = [
    autoprefixer({ browsers: ['last 20 versions'] }),
    require('postcss-font-magician')({}),
     selectors,
  ];

  return gulp.src(['sass/reset.scss',
          'sass/main.scss',
          'css/sprite.css',
          'sass/style.scss',])
    .pipe(plumber())
    .pipe(concat('style.css'))
    //.pipe(sass().on('error', error))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(postcss(processors))
    .pipe(gulp.dest('css/'));
});


/*------------------------------------*\
    Sprites
\*------------------------------------*/

gulp.task('sprite', function () {
  var spriteData = gulp.src('images/main/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    imgPath: '../images/sprite.png',
    padding: 1,
    cssOpts: {
    // for remove prefix icon-
    cssSelector: function (sprite) {
      return '.' + sprite.name;
    },
    algorithmOpts: {sort: true}
  }
}));

  var imgStream = spriteData.img
    .pipe(gulp.dest('images/'));

  var cssStream = spriteData.css
    .pipe(gulp.dest('css/'));

  return merge(imgStream, cssStream);
  // return spriteData.pipe(gulp.dest('css/'));
});


/*------------------------------------*\
    Borwsersync server
\*------------------------------------*/

gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: ""
  });

  // gulp.watch("/sass/*.scss", { interval: 500 }, ['sass']);
  gulp.watch("css/style.css").on('change', browserSync.reload);
  gulp.watch("index.html").on('change', browserSync.reload);
});

/*------------------------------------*\
    Watch
\*------------------------------------*/

gulp.task('watch', function() {
  gulp.watch('sass/**/*.scss', { interval: 500 }, ['sass', 'notify']);
  // gulp.watch('images/main/*.png', { interval: 500 }, ['sprite']);
});

/*------------------------------------*\
    Notify
\*------------------------------------*/

gulp.task('notify', function() {
  var date = new Date();
  gulp.src("css/style.css")
  .pipe(notify("Css was compiled! at " + date));
});

/*------------------------------------*\
    Run default gulp tasks
\*------------------------------------*/

gulp.task('default', ['sass', 'watch']);


/**
***************************************************************
* =FUNCTIONS
***************************************************************
**/

// function like a plumber js
function error(error) {
  console.log(error.toString());
  this.emit('end');
}

