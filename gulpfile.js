// Use the module loader to load the plugins
// when required.
const gulp          = require('gulp');
const autoprefixer  = require('autoprefixer');
const cssnano       = require('cssnano');
const postcss       = require('gulp-postcss');
const sass          = require('gulp-sass');
const paths = {
    styles: {
      // Using a ** in lieu of a folder name
      // will check all folders within that
      // directory recursively for matching files
      src: 'src/sass/*.scss',
      // Compiled files are output to whichever
      // folder the source file is found in if
      // the ** is used to iterate a file tree
      dest: 'assets/css'
    },
    js: {
      src: 'src/js/*.js',
      dest: 'assets/js'
    }
};
// Add a server so we can launch the compiled files
// directly in the browser
const browserSync = require('browser-sync').create();

function style() {
  return gulp
    // Sets the source of the files and initializes
    // the sourcemaps
    .src(paths.styles.src, {sourcemaps: true})
    // First, compile the sass to css using the
    // sass plugin and log any errors
    .pipe(sass())
    .on('error', sass.logError)
    // Next, use postcss to construct an AST from the
    // compiled css so that we can use autoprefixer
    // and cssnano (to minify)
    .pipe(postcss([autoprefixer(), cssnano()]))
    // Sourcmaps need to be initialized on the
    // source and destination
    .pipe(gulp.dest(paths.styles.dest, {sourcemaps: true}))
    // Add browsersync pipe after
    // compilation to stream the results
    .pipe(browserSync.stream());
}

// Reload the server
function reload() {
  browserSync.reload();
}

function watch() {
  browserSync.init({
      // browser-sync will launch the files
      // at the root of the directory supplied
      server: {
          baseDir: './'
      }
      // If you are already serving your website locally
      // using something like Apache, use the proxy
      // setting to proxy it instead such as:
      // proxy: 'yourlocal.dev'
  });

  gulp.watch(paths.styles.src, style);
  gulp.watch('index.html', reload);
}
exports.watch = watch;
