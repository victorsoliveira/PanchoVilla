/**
 * Created by victoroliveira on 08/04/16.
 */

module.exports = function(grunt) {

    grunt.initConfig({

        run: {
            electron: {
                cmd: "./node_modules/.bin/electron", // but that's the default
                args: [
                    'app'
                ]
            }
        }

    });

    grunt.loadNpmTasks('grunt-run');
    grunt.registerTask('start', ['run:electron']);

};