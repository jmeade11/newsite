const gulp          = require('gulp');
const autoprefixer  = require('autoprefixer');
const cssnano       = require('cssnano');
const postcss       = require('gulp-postcss');
const sass          = require('gulp-sass');
const paths = {
    styles: {
        // By using styles/**/*.sass we're telling gulp to check all folders for any sass file
        src: 'src/sass/*.scss',
        // Compiled files will end up in whichever folder it's found in (partials are not compiled)
        dest: 'assets/css'
    }

  // Easily add additional paths
  // ,
  // html: {
  //  src: '...',
  //  dest: '...'
  // }
};
// Add a server so it can watch the files and run them directly in the browser
const browserSync = require("browser-sync").create();

function style() {
  return gulp
    .src(paths.styles.src, { sourcemaps: true })
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest(paths.styles.dest))
    // Add browsersync stream pipe after compilation
    .pipe(browserSync.stream());
}

// A simple task to reload the page
function reload() {
  browserSync.reload();
}

function watch() {
  browserSync.init({
      // You can tell browserSync to use this directory and serve it as a mini-server
      server: {
          baseDir: "./"
      }
      // If you are already serving your website locally using something like apache
      // You can use the proxy setting to proxy that instead
      // proxy: "yourlocal.dev"
  });

  gulp.watch(paths.styles.src, style);
  gulp.watch("index.html", reload);
}
exports.watch = watch;
