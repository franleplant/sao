module.exports = function(karma) {
  karma.set({

    frameworks: [ 'browserify', 'jasmine' ],
    files: [
        './node_modules/es5-shim/es5-shim.js',
        './js/**/*.test.js'
    ],
    preprocessors: {
      './js/**/*.test.js': [ 'browserify' ]
    },
    browsers: [
        'PhantomJS'
    ],
    browserNoActivityTimeout: 20000,

    singleRun: true,

    browserify: {
      debug: true,
      transform: [ 'babelify' ],
      plugin: ['proxyquire-universal']
    }
  });
}
