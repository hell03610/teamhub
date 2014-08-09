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
        dest: 'public/js/app.bundle.js',
        options: {
          transform: ['browserify-handlebars']
        }
      }
    },
    clean:{
      bundle: ['public/js/app.bundle.js'],
      server: {
        options: {force:true},
        src: ['../server/public']
      }
    },
    copy: {
      public: {
        files:[{expand: true, src: ['public/**'], dest: '../server/'}],
      }
    },
    watch: {
      dist: {
        files: ['src/**/*.js','public/index.html','public/css/**'],
        tasks: ['dist'],
        options: {
          spawn: false,
        },
      },
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('dist', ['clean:bundle','browserify', 'clean:server','copy:public']);

  // Default task.
  grunt.registerTask('default', ['dist', 'watch:dist']);
};