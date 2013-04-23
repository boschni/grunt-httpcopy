/*
 * grunt-httpcopy
 *
 *
 * Copyright (c) 2013 Niek Bosch
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    grunt.registerMultiTask('httpcopy', 'HTTP copy.', function () {

        var path = require('path'),
            http = require('http'),
            done = this.async();

        // File path (relative) to url mapper
        var urlMapper = function (serverUrl, relativeFilePath) {
            return serverUrl + relativeFilePath;
        };

        // Set options
        var options = this.options({
            serverUrl: 'http://localhost/',
            urlMapper: urlMapper
        });

        // Iterate over all src-dest file pairs.
        grunt.util.async.forEach(this.files, function (filePair, filePairDone) {

            grunt.util.async.forEach(filePair.src, function (relativeFilePath, fileCopyDone) {

                var url = options.urlMapper(options.serverUrl, relativeFilePath),
                    urlColored = grunt.log.wordlist([url], {color: 'cyan'});

                http.get(url, function (response) {

                    if (response.statusCode !== 200) {
                        grunt.log.warn('Got response code ' + response.statusCode + ' while trying to copy ' + urlColored + ' -> ' + filePair.dest.cyan);
                    }

                    var data = '';
                    response.setEncoding('binary');
                    response.on('data', function (chunk) {
                        data += chunk;
                    });

                    response.on('end', function () {
                        grunt.file.mkdir(path.dirname(filePair.dest));
                        grunt.file.write(filePair.dest, data);
                        grunt.log.writeln('Copied ' + urlColored + ' -> ' + filePair.dest.cyan);
                        fileCopyDone();
                    });

                    response.on('error', function (e) {
                        grunt.fail.warn('Got error: ' + e.message);
                        fileCopyDone(false);
                    });
                }).on('error', function(e) {
                    grunt.fail.warn('Got error: ' + e.message);
                    fileCopyDone(false);
                });
            }, filePairDone);
        }, done);
    });
};