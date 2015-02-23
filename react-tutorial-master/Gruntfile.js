
/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    react: {
      dynamic_mappings: {
        files: [
          {
            expand: true,
            cwd: 'app/js',
            src: ['**/*.jsx'],
            dest: 'generated/js/',
            ext: '.js'
          }
        ]
      }
    },
    //Task configuration.
    concat: {
      options: {
        banner: '<%= pkg.banner %>',
        stripBanners: true
      },
      dist: {
        src: [
        'generated/js/*.js'
        ],
        dest: 'dist/js/app.js'
      }
    },
    watch: {
      all: {
          files: ['app/**/*'],
          tasks: ['jshint', 'react', 'concat']
        }
    },
    // uglify: {
    //   options: {
    //     banner: '<%= pkg.banner %>'
    //   },
    //   dist: {
    //     src: '<%= concat.dist.dest %>',
    //     dest: 'dist/app.min.js'
    //   }
    // },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      }
    },
      gruntfile: {
        src: 'Gruntfile.js'
      }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint', 'react', 'concat']);
  // grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};
