module.exports = function (grunt) {

    grunt.initConfig({

        clean: {
            cache: {
                src:  "dist"
            }
        },

        copy: {
            main: {
                files: [
                    {expand: true, flatten: true, src: ['src/index.html'], dest: 'dist/'}
                ]
            }
        },

        "bower-install-simple": {
            options: {
            }
        },

        replace: {
            example: {
                options: {
                    patterns: [
                        {
                            match: 'css_exemple',
                            replacement: '<%= grunt.file.read("example/example.css") %>'
                        }
                    ]
                },
                files: [
                    {expand: false, flatten: true, src: ['dist/index.html'], dest: 'dist/index.html'}
                ]
            },
            analytics_dev: {
                options: {
                    patterns: [
                        {
                            match: 'analytics',
                            replacement: ''
                        }
                    ]
                },
                files: [
                    {expand: false, flatten: true, src: ['dist/index.html'], dest: 'dist/index.html'}
                ]
            },
            analytics_prod: {
                options: {
                    patterns: [
                        {
                            match: 'analytics',
                            replacement: '<%= grunt.file.read("src/analytics.html") %>'
                        }
                    ]
                },
                files: [
                    {expand: false, flatten: true, src: ['dist/index.html'], dest: 'dist/index.html'}
                ]
            }
        },

        concat: {
            js: {
                options: {
                    separator: ';'
                },
                nonull: true,
                src: [
                    'bower_components/cssParser/cssParser.js',
                    'bower_components/d3/d3.js',
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/bootstrap/js/tooltip.js',
                    'src/files.js',
                    'src/treemap.js',
                    'src/index.js'
                ],
                dest: 'dist/main.js'
            },
            css: {
                nonull: true,
                src: [
 		   'bower_components/bootstrap/dist/css/bootstrap.css',
                   'src/main.css'
                ],
                dest: 'dist/main.css'
            }
        },
        uglify: {
            main: {
                files: {
                    '<%= concat.js.dest %>': ['<%= concat.js.dest %>']
                }
            }
        },

        watch: {
            srv: {
                files: ['src/**'],
                tasks: ['default']
            }
        },

        'gh-pages': {
            options: {
                base: 'dist'
            },
            src: ['**']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks("grunt-bower-install-simple");
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('base', ['clean', 'bower-install-simple', 'copy', 'replace:example', 'concat', 'uglify' ]);
    grunt.registerTask('default', ['base', 'replace:analytics_dev']);
    grunt.registerTask('push', ['base', 'replace:analytics_prod', 'gh-pages']);

};
