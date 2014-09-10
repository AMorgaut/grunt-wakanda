# grunt-wakanda
[![NPM version](https://badge.fury.io/js/grunt-wakanda.svg)](http://badge.fury.io/js/grunt-wakanda)

> Start Wakanda Server

May be considered as a replacement for [grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect). Useful running a Wakanda Solution and its NoSQL databases. 

Uses the [Wakanda Server](http://wakanda.org) installed on the system.

*Doesn't have a `middleware` option as grunt-contrib-connect does.*


## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-wakanda --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('wakanda');
```

## The "wakanda" task

### Overview
In your project's Gruntfile, add a section named `wakanda` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  wakanda: {
    options: {
      bin: 'path to the Wakanda server', 
      solution: 'path of a wakanda solution', 
      keepalive: true, 
      leavealive: false, 
      open: true
    }
  }
});
```

### Options

#### options.bin
Type: `String`
Default value: `''`

A string value that is used to find the Wakanda Server build to run.
If not specified, the default os specific path is used

#### options.solution
Type: `String`
Default value: `''`

A string value that is used to specify the Wakanda Solution to open.
If not specified, the default solution embeded in the server is used

#### options.keepalive
Type: `Boolean`
Default value: false

A boolean value that is used to block task execution once the server is started (and the browser open is 'open' is true)

#### options.leavealive
Type: `Boolean`
Default value: false

A boolean value that is used to maintain the server started once grunt exit.

#### options.open
Type: `Boolean`
Default value: false

A boolean value that is used to open the Web Administration page in the browser.


### Usage Examples

#### Default Options
In this example, the default options are used to find and start Wakanda Server.
The Administration panel is opened so you can browse your computer files to load a solution.

```js
grunt.initConfig({
  wakanda: {
    options: { 
      keepalive: true, 
      leavealive: false, 
      open: true
    }
  }
});
```

## Todo

### options
All wakanda server command line should be managed including
* `debugger` mode (default set to `remote` to use Chrome Web Inspector)
* custom http and https `port numbers`
* custom `admin password`
* activate `syslog` mode
* activate the `verbose` mode (requires Wakanda 9)
* get the server `version` 
* get the running server `job-id` 
* set custom `system-workers` settings
* disable the `discovery` service

## watch / reload
For dev mode the wakanda task should watch when the Wakanda Model is modified and reload Model related pages in the browser

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

0.1.2: Start the Wakanda server and Open Admin page in the browser

## License
Copyright (c) 2014 Alexandre Morgaut. Licensed under the MIT license.
