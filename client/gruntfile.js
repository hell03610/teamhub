/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    datetime: Date.now(),

    browserify: {
      client: {
        src: ['src/**/*.js'],
        dest: 'app.bundle.js',
        options: {
          watch: true,
          keepAlive: true,
          transform: ['browserify-handlebars']
        }
      }
    },
    clean:{
      bundle: ['app.bundle.js']
    },
    connect: {
      server: {
        options: {
          port: 3000,
           middleware: function(connect, options, middlewares) {
            // inject a custom middleware into the array of default middlewares
            middlewares.unshift(function(req, res, next) {

              if (req.url.indexOf('.js') > -1 || req.url.indexOf('public/') > -1) return next();

              var fs = require('fs');
                fs.readFile('index.html', function (err, data) {
                  if (err) {
                    next(err);
                    return;
                  }
                  res.writeHead(200, {'Content-type':'text/html'});
                  res.write(data);
                  res.end();
              });
            });

            return middlewares;
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task.
  grunt.registerTask('default', ['connect:server','clean:bundle','browserify']);
};