/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    datetime: Date.now(),

    browserify: {
      client: {
        src: ['js/**/*.js'],
        dest: 'js/app.bundle.js',
        options: {
          watch: true,
          keepAlive: true,
          transform: ['browserify-handlebars']
        }
      }
    },
    clean:{
      bundle: ['js/app.bundle.js']
    },
    connect: {
      server: {
        options: {
          port: 3000
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