/*
 * wakanda
 * 
 *
 * Copyright (c) 2014 Alexandre Morgaut
 * Licensed under the MIT license.
 */

'use strict';

var os = require('os');
var path = require('path');
var spawn = require('child_process').spawn;
var http = require('http');
var open = require('opn');

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  function getDefaultBin() {
    switch (os.platform()) {
      case 'win32':
        return 'c:\\wakanda versions\\wak2\\wakanda server\\wakanda server.exe';
      case 'darwin':
        return '/Applications/Wakanda Server.app/Contents/MacOS/Wakanda Server';
      default:
        return 'wakanda'
    }
  }

  function escapeShellArg(arg) {
    ['\\', '$', '`'].forEach(function (char) {
      arg = arg.split(char).join('\\' + char);
    })
    return arg;
  }

  grunt.loadNpmTasks('grunt-debug-task');

  grunt.registerTask('wakanda', 'Start Wakanda Server', function () {

    function exit() {
      if (interval) {
        clearInterval(interval);
      }
      if (!options.keepalive) {
        done();
      }
    }

    function open() {
      if (options.open) {
        grunt.log.writeln('Open URL:', host);
        require('opn')('http://' + host);
      }
      exit();
    }

    function openWhenReady() {
      http.request({

        method: 'HEAD',
        hostname: options.hostname,
        port: options.port,
        path: '/rest/'
      
      }, open).on('error', function (err) {
        checkServerTries += 1;
        if (checkServerTries > 5) {
          exit();
        }
      }).end();
    }
    
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      port: 8080,
      hostname: '127.0.0.1',
      bin: getDefaultBin(),
      solution: '',
      debug: 'remote',
      open: false,
      keepalive: false,
      leavealive: false,
      stdio: 'inherit',
      callback: function (error, result, code) {
        grunt.log.writeln(error, result, code);
      }
    });

    var cmd = path.normalize(options.bin);
    var host = options.hostname + ':' + options.port;
    var args = [];
    var checkServerTries = 0;
    
    // Solution path
    if (options.solution) {
      args.push(options.solution);
    }

    // Debug Mode
    if (['remote', 'wakanda', 'none'].indexOf(options.debug) === -1) {
        options.debug = 'remote';
    }
    //args.push('-g:' + options.debug);

    // Launch the server
    grunt.log.writeln('Starting Wakanda!');
    var done = this.async();
    var wakanda = spawn(cmd, args, {stdio: options.stdio, cwd: '.'});

    // Ask to quit Wakanda when grunt is done if 'leavealive' is false
    if (!options.leavealive) {
      process.on('exit', function () {
        grunt.log.writeln('Grunt is Stopping');
        if (!wakanda || !wakanda.pid) {
          return;
        }
        wakanda.kill();
      });
    }
    

    wakanda.on('exit', function () {
      grunt.log.writeln('Wakanda Server is Stopping');
      if (interval) {
        clearInterval(interval);
      }
      done();
    });

    var interval = setInterval(openWhenReady, 1000);

  }); // end registerTask

};
