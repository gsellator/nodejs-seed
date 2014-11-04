module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: ["pkg/"],

        env : {
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
            main: {
                files: [
                    {src: [
                        '.ftppass',
                        'app.js',
                        'config/**',
                        'controllers/**',
                        'helpers/**',
                        'models/**',
                        'package.json',
                        'public/favicon.ico',
                        'public/favicon.png',
                        'public/css/**',
                        'public/img/**',
                        'public/js/**',
                        'public/tmp/**',
                        'sh/**',
                        'templates/**',
                        'views/**'
                    ], dest: 'pkg/'}
                ]
            }
        },

        'sftp-deploy': {
            pre: {
                auth: {
                    host: 'delirium.cloudapp.net',
                    port: 22,
                    authKey: 'pre'
                },
                src: 'pkg',
                dest: '/home/Hub-pre/Hub',
                server_sep: '/'
            },
            prod: {
                auth: {
                    host: 'delirium.cloudapp.net',
                    port: 22,
                    authKey: 'prod'
                },
                src: 'pkg',
                dest: '/home/Hub-prod/Hub',
                server_sep: '/'
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-sftp-deploy');

    grunt.registerTask('pre', ['env:pre', 'clean', 'bump', 'copy', 'sftp-deploy:pre']);
    grunt.registerTask('prod', ['env:prod', 'clean', 'bump', 'copy', 'sftp-deploy:prod']);
};
