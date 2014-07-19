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
            dist: {
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
            }
        },

        concat: {
            main: {
                options: {
                    separator: ';'
                },
                nonull: true,
                src: [
                    'bower_components/cssParser/cssParser.js',
                    'bower_components/d3/d3.js'
                ],
                dest: 'dist/main.js'
            }
        },
        uglify: {
            main: {
                files: {
                    '<%= concat.main.dest %>': ['<%= concat.main.dest %>']
                }
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks("grunt-bower-install-simple");

    grunt.registerTask('default', ['clean', 'bower-install-simple', 'copy', 'replace', 'concat', 'uglify' ]);

};
