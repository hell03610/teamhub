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
          external: ['jQuery']
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-browserify');

  // Default task.
  grunt.registerTask('default', ['browserify']);
};