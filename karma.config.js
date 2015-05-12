module.exports = function(karma) {
  karma.set({

    frameworks: [ 'browserify', 'jasmine' ],
    files: ['./js/**/*.test.js'],
    preprocessors: {
      './js/**/*.test.js': [ 'browserify' ]
    },
    browsers: [
        'PhantomJS'
    ],

    singleRun: true,

    browserify: {
      debug: true,
      transform: [ 'babelify' ]
    }
  });
}
