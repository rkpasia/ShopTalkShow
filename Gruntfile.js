// Gruntfile.js
module.exports = function (grunt) {

    require('time-grunt')(grunt);

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
      jekyll: {
        build:{
          src: '/',
          dest: '_site'
        }
      },
      connect: {
        server: {
          options: {
            port: '9000',
            base: '_site',
            livereload: true
          }
        }
      },
      watch: {
        options:{
          livereload: true
        },
        scripts: {
          files: ['assets/js/*.js']
        },
        html: {
          files: ['_layouts/*.html','_includes/*.html','*.html'],
          tasks: ['jekyll']
        },
        sass: {
          files: ['assets/_sass/**/*.scss','assets/_sass/**/*.sass'],
          tasks: ['sass','jekyll']
        },
        svg: {
          files: ['assets/svg/*.svg'],
          tasks: ['svgstore','jekyll']
        }
      },
      compass: {
        compile:{
          options: {
            require: 'susy',
            sassDir: 'assets/_sass',
            importPath: 'assets/_sass',
            cssDir: 'assets/css',
            imagesDir: 'assets/img',
            outputStyle: 'compact',
            debugInfo: false,
            environment: 'production'
          }
        }
      },
      sass: {
        dist: {
          options: {
            style: 'expanded',
            compass: true
          },
          files: {
            'assets/css/main.css': 'assets/_sass/main.scss'
          }
        }
      },
      svgstore: {
        options: {
          prefix: 'icon-',
          svg: {
            style: 'display: none;'
          }
        },
        dist: {
          files: {
            '_includes/svg-dist.svg': ['assets/svg/*.svg']
          }
        }
      }
    });

    grunt.registerTask('default', ['compass','jekyll']);
    grunt.registerTask('serve', ['sass','svgstore','jekyll','connect','watch']);

};
