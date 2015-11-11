'use strict';

var request = require('request');
var path = require('path');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js'
      }
    },
    sass: {
      dist: {
        files: {
          'public/css/<%= pkg.name %>.css': 'app/css/<%= pkg.name %>.scss'
        }
      }
    },
    concat: {
      options: {
        separator: '\n'
      },
      dist: {
        src: ['app/js/**/*.js'],
        dest: 'public/js/<%= pkg.name %>.js'
      },
      vendor: {
        src: [
          'public/components/jquery/dist/jquery.min.js'
        ],
        dest: 'public/js/vendor.min.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      js: {
        files: {
          'public/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    cssmin: {
      compress: {
        files: {
          'public/css/<%= pkg.name %>.min.css': ['public/css/<%= pkg.name %>.css']
        }
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      js: {
        files: [
          'app.js',
          'app/**/*.js',
          'config/*.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      css: {
        files: [
          'app/css/*.scss'
        ],
        tasks: ['sass', 'cssmin'],
        options: {
          livereload: reloadPort
        }
      },
      views: {
        files: [
          'app/views/*.handlebars',
          'app/views/**/*.handlebars'
        ],
        options: { livereload: reloadPort }
      },
      scripts: {
        files: [
          'app/js/**/*.js'
        ],
        tasks: ['concat', 'uglify']
      }
    }
  });

  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function(err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded)
            grunt.log.ok('Delayed live reload successful.');
          else
            grunt.log.error('Unable to make a delayed live reload.');
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask('default', [
    'sass',
    'develop',
    'concat',
    'uglify',
    'cssmin',
    'watch'
  ]);
};
