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
          keepAlive: true
        }
      }
    },
    clean:{
      bundle: ['js/app.bundle.js']
    }

  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task.
  grunt.registerTask('default', ['clean:bundle','browserify']);
};