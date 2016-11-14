/* eslint-env node */
// This is a basic Gruntfile illustrating how to call the sw-precache library. It doesn't include
// all of the functionality from  the sample gulpfile, such as running a web server, or managing
// separate DEV and DIST directories.

'use strict';

var packageJson = require('../package.json');
var path = require('path');
var swPrecache = require('sw-precache/lib/sw-precache.js');

module.exports = function(grunt, target) {

    grunt.mergeConfig({
        swPrecache: {
            dev: {
                handleFetch: true,
                rootDir: '.'
            }
        }
    });

    function writeServiceWorkerFile(rootDir, handleFetch, callback) {
        console.log(target);
        var staticPath = "/src";
        var staticExt = "";


        if (target == "stag") {
            staticPath = "/gen"
            staticExt = ".min"
        }



        var config = {
            cacheId: packageJson.name,
            /*dynamicUrlToDependencies: {
              'dynamic/page1': [
                path.join(rootDir, 'views', 'layout.jade'),
                path.join(rootDir, 'views', 'page1.jade')
              ],
              'dynamic/page2': [
                path.join(rootDir, 'views', 'layout.jade'),
                path.join(rootDir, 'views', 'page2.jade')
              ]
            },*/
            // If handleFetch is false (i.e. because this is called from swPrecache:dev), then
            // the service worker will precache resources but won't actually serve them.
            // This allows you to test precaching behavior without worry about the cache preventing your
            // local changes from being picked up during the development cycle.
            handleFetch: handleFetch,
            logger: grunt.log.writeln,
            staticFileGlobs: [
                rootDir + staticPath + '/c/**' + staticExt + '.css',
                rootDir + '/**.html',
                rootDir + staticPath + '/i/**' + staticExt + '.*',
                rootDir + staticPath + '/j/**' + staticExt + '.js'
            ],
            //stripPrefix: rootDir + '/src',
            // verbose defaults to false, but for the purposes of this demo, log more.
            verbose: true,
            directoryIndex: false,
            navigateFallback: './index.html'

        };

        swPrecache.write(path.join(rootDir, 'service-worker.js'), config, callback);
    }

    grunt.registerMultiTask('swPrecache', function() {
        var done = this.async();
        var rootDir = this.data.rootDir;
        var handleFetch = this.data.handleFetch;

        writeServiceWorkerFile(rootDir, handleFetch, function(error) {
            if (error) {
                grunt.fail.warn(error);
            }
            done();
        });
    });
};
