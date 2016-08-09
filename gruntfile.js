/*global module:false*/

module.exports = function (grunt) {

 

  
  // Define the configuration for all the tasks


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    banner: '/*! \n * <%= pkg.title || pkg.name %> v<%= pkg.version %>\n' +
      ' * <%= pkg.homepage %>\n' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +      
      ' */\n',
    karma :{
      unit :{
        configFile: 'karma.conf.js'
      }
    },      
    
    cssmin: {
      css: {
        src: 'src/assets/css/light-box.css',
        dest: 'src/assets/css/light-box.min.css'
      }
    },
    less: {
      compile: {
        files: {
          'src/assets/css/light-box.css': 'src/less/light-box.less'
        }
      }
    },

    uglify: {
      build: {
        files: {
          'build/app.js': ['build/app.js']
        },
        options: {
          mangle: false
        }
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      build: {
        src: ['src/app/*.js',
         'src/app/**/*.js',
         'src/common/**/*.js',
         '!src/app/**/*.test.js'
         ],
        dest: 'build/app.js'
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'src/app/*.js','src/app/**/.js', 'src/common/*.js']
    },

    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 9001
        }
      }
    },

    watch: {
      build: {
        files: ['Gruntfile.js', 'src/app/*.js', 'src/*.html', 'src/app/**/*', 'src/assets/css/light-box.css'],
        tasks: [ 'concat:build', 'cssmin:css'],
        options: {
          livereload: true
        }
      },
      release: {
        files: ['Gruntfile.js', 'src/app/*.js', 'src/*.html', 'public/components/**/*', 'public/less/light-box.less'],
        tasks: [ 'concat:build', 'uglify:build',  'cssmin:css'],
        options: {
          livereload: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('build', [ 'connect:server', 'watch:build']);
  grunt.registerTask('test', ['karma','watch:build']);
  grunt.registerTask('release', [ 'connect:server', 'watch:release']);

  // Print a timestamp (useful for when watching)
  grunt.registerTask('timestamp', function() {
    grunt.log.subhead(Date());
  });

};