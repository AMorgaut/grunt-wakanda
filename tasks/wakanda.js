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
        return 'wakanda';
    }
  }

  function escapeShellArg(arg) {
    arg = String(arg);
    ['\\', '$', '`'].forEach(function (char) {
      arg = arg.split(char).join('\\' + char);
    });
    return arg;
  }

  grunt.registerMultiTask('wakanda', 'Start Wakanda Server', function () {

    function exit() {
      if (interval) {
        clearInterval(interval);
      }
      if (!options.keepalive) {
        done();
      }
    }

    function ready() {
      grunt.event.emit('wakandaReady');
      grunt.log.writeln('Wakanda Server is ready');
      if (options.open) {
        grunt.log.writeln('Open URL:', url);
        open(url);
      }
      exit();
    }

    function waitUntilReady() {
      http.request({

        method: 'HEAD',
        hostname: options.hostname,
        port: options.port,
        path: '/rest/'
      
      }, ready).on('error', function (err) {
        grunt.log.writeln('Ping', maxServerPing);

        if (maxServerPing < 0) {
          exit();
        }
        maxServerPing -= 1;

      }).end();
    }

    function pushArg(key, value, valueRequired) {
      if (value === true) {
        // do nothing
      } else if (value) {
        key += '=' + escapeShellArg(value);
      } else if (valueRequired) {
        return;
      }
      args.push(key);
    }
    
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      bin: getDefaultBin(),
      // Solution
      solution: '',
      script: '',
      // Administration options
      login: undefined,
      password: undefined,
      port: 8080,
      ssl: 4433,
      // Discovery options
      discovery: true,
      // Debugger options
      debug: 'remote',
      // Jobs
      jobId: undefined,
      // System Workers
      systemWorkers: undefined,
      // Logging facility
      syslog: false,
      netdump: false,
      verbose: false, // planned for Wakanda 9
      // Help
      wversion: false,
      whelp: false,
      // Task options
      host: '127.0.0.1',
      wait: false,
      open: false,
      keepalive: false,
      leavealive: false,
      stdio: 'inherit'
    });

    //grunt.log.writeln('Options', options);

    var cmd = path.normalize(options.bin);
    var solution = path.normalize(options.solution || options.script);
    var url = 'http://' + options.host + ':' + options.port;
    var systemWorkers = options.systemWorkers && path.normalize(options.systemWorkers);
    var args = [];
    var maxServerPing = 5;
    
    // Solution or file path
    if (solution !== '.') {
      pushArg(solution);
    }

    // Administration options
    pushArg('--admin-login', options.login, true);
    pushArg('--admin-password', options.password, true);
    pushArg('--admin-port', options.port);
    pushArg('--admin-ssl-port', options.ssl);
    // Service discovery options
    pushArg('--without-discovery', !options.discovery, true);
    // Debugger settings
    pushArg('--debugger', options.debug);
    if (options.debug === 'none') {
      pushArg('--debug-off', true);
    }
    // Jobs
    pushArg('--job-id', options.jobId, true);
    // System Workers
    pushArg('--system-workers', systemWorkers, true);
    // Logging facility
    pushArg('--syslog', options.syslog, true);
    pushArg('--netdump', options.netdump, true);
    pushArg('--verbose', options.verbose, true); // planned for Wakanda 9
    // Help
    pushArg('--version', options.wversion, true);
    pushArg('--help', options.whelp, true);

    /*process.stdout.on('data', function(buf) {
        console.log("data:", String(buf));
    });*/

    // Launch the server
    if (!options.wversion && !options.whelp) {
      grunt.log.writeln('Starting Wakanda!');
    }
    var done = this.async();
    grunt.log.writeln('Spawn Wakanda', args);
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
    
    grunt.event.on('wakandaExitRequest', function () {
      if (!wakanda || !wakanda.pid) {
        return;
      }
      wakanda.kill();
    });

    wakanda.on('exit', function () {
      if (!options.wversion && !options.whelp) {
        grunt.log.writeln('Wakanda Server is Stopping');
      }
      if (interval) {
        clearInterval(interval);
      }
      grunt.event.emit('wakandaExit');
      done();
    });

    if (options.wait || options.open) {
      var interval = setInterval(waitUntilReady, 1000);
    }

  }); // end registerTask

};
