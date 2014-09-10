/*global module:false*/
module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',

        clean: ["pkg/"],

        env : {
            options : {
                /* Shared Options Hash */
                //globalOption : 'foo'
            },
            dev: {
                NODE_ENV : 'DEVELOPMENT'
            },
            pre : {
                NODE_ENV : 'PREPRODUCTION'
            },
            prod : {
                NODE_ENV : 'PRODUCTION'
            }
        },

        bump: {
            options: {
                commit: false,
                createTag: false,
                push: false
            }
        },

        copy: {
            package: {
                src: 'package.json',
                dest: 'pkg/',
            }
        },

        'sftp-deploy': {
            prod: {
                auth: {
                    host: 'delirium.cloudapp.net',
                    port: 22,
                    authKey: 'prod'
                },
                src: 'pkg',
                dest: '/home/AdminDaily-prod/AdminDaily',
                server_sep: '/'
            }
        },
        sass: {
            dist: {
              files: [{
                 'public/css/style.css': 'public/scss/style.scss',
              }]
            }
        },
         watch: {
            sass: {
              // We watch and compile sass files as normal but don't live reload here
              files: ['public/scss/*.scss'],
              tasks: ['sass'],
            },
            livereload: {
              // Here we watch the files the sass task will compile to
              // These files are sent to the live reload server after sass compiles to them
              options: { livereload: true },
              files: ['public/css/*'],
            },
          },
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-sftp-deploy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    //grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-serve');

    grunt.registerTask('prod', ['env:prod', 'clean', 'bump', 'copy', 'sftp-deploy:prod', 'sass']);
};