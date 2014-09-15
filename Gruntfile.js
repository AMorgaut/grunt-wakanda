/*
 * wakanda
 * 
 *
 * Copyright (c) 2014 Alexandre Morgaut
 * Licensed under the MIT license.
 */

'use strict';

var os = require('os');

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

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    wakanda: {
      default_options: {
        options: {} 
      },/*
      options_custom_stdio: {
        options: {
          stdio: undefined
        } 
      },
      options_custom_bin: {
        options: {
          bin: getDefaultBin(),
          stdio: undefined
        } 
      },
      options_custom_login: {
        options: {
          login: 'foo',
          password: 'bar',
          stdio: undefined
        } 
      },*/
      options_custom_port: {
        options: {
          port: 8090,
          stdio: undefined
        } 
      }/*,
      options_custom_ssl: {
        options: {
          port: 4242,
          stdio: undefined
        } 
      },
      options_without_discovery: {
        options: {
          discovery: false,
          stdio: undefined
        } 
      },
      options_no_debug: {
        options: {
          debug: 'none',
          stdio: undefined
        } 
      },
      options_syslog: {
        options: {
          syslog: true,
          stdio: undefined
        } 
      },
      options_netdump: {
        options: {
          netdump: true,
          stdio: undefined
        }
      },
      options_whelp: {
        options: {
          whelp: true
        } 
      },
      options_wversion: {
        options: {
          wversion: true
        } 
      }*/
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'wakanda', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
