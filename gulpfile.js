const config = require('./server/config');

const gulp = require('gulp'),
  browserSync = require('browser-sync'),
  nodemon = require('gulp-nodemon');

gulp.task('default', ['browser-sync']);

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: `http://localhost:${config.server.port}`,
    files: ["public/**/*.*"],
    port: 7000,
    reloadDelay: 300,
    injectChanges: true,
    open: false
  });
});
gulp.task('nodemon', function (cb) {
  
  let started = false;
  
  return nodemon({
    script: 'app.js',
    watch: ['app.js', 'server/**/*.*']
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    if (!started) {
      cb();
      started = true;
    }
  });
});

