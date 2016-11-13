var babel = require('rollup-plugin-babel');
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var replace = require('rollup-plugin-replace');

//var swPrecacheConf = require('./sw-precache.conf.js');

module.exports = function(grunt) {

    var target = grunt.option('target');

    grunt.initConfig({
        env: {
            dev: {},
            test: {},
            stag: {}
        },
        rollup: {
            interfaces: {
                options: {
                    moduleName: "interfaces",
                    format: "iife",
                    plugins: function() {
                        return [
                            nodeResolve({ jsnext: true, main: true }),
                            commonjs(),
                            replace({
                                'process.env.NODE_ENV': JSON.stringify("dev")
                            }),
                            babel({
                                exclude: '../node_modules/**'
                            })
                        ];
                    }
                },

                files: [{
                    'dest': 'src/j/interfaces.js',
                    'src': 'src/jass/index.js'
                }]
            },
            modules: {
                options: {
                    format: "iife",
                    plugins: function() {
                        return [
                            babel({
                                exclude: './node_modules/**'
                            }),
                            nodeResolve({ jsnext: true, main: true, skip: ['react'] }),
                            commonjs(),
                            replace({
                                'process.env.NODE_ENV': JSON.stringify("production")
                            })
                        ];
                    },
                    globals: {
                        react: 'interfaces["Virtual"]',
                        reactDom: 'interfaces["VirtualDom"]'
                    }
                },
                files: [{
                    'dest': 'src/j/app.js',
                    'src': 'src/app/index.js'
                }]
            },            
        },
        browserify: {
            interfaces: {
                files: {
                    'src/j/interfaces.js': 'src/j/interfaces.js'
                }
            },
            modules: {
                files: {
                    'src/j/app.js': 'src/j/app.js'

                }
            }
        },
        watch: {
            build: {
                files: ['src/app/**/*.js'],
                tasks: ["rollup"]
            }
        }
    });



    grunt.file.expand('../node_modules/grunt-*/tasks').forEach(grunt.loadTasks);
    require('../node_modules/grunt-config-merge')(grunt);
    require('../grunt/global/grunt-default.js')(grunt);

    //swPrecacheConf(grunt);
    grunt.registerTask('interfaces', ["rollup:interfaces", "browserify:interfaces"])
    grunt.registerTask('default', ["rollup:modules", "browserify:modules"/*, "swPrecache"*/])        
};
