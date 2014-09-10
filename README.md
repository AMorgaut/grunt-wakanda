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
grunt.loadNpmTasks('grunt-wakanda');
```

Or using [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks) it could automatically done by:

```js
require('load-grunt-tasks')(grunt);
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

#### options.wait
Type: `Boolean`
Default value: false

A boolean value that is used to block task execution until the server is started. This option isn't necessary if `open` is activated (as open is already waiting for the server to be ready).

#### options.keepalive
Type: `Boolean`
Default value: false

A boolean value that is used to block task execution once the server is started (and once the browser open is 'open' is true)

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


### watch / reload
For dev mode a task should watch when the Wakanda Model is modified and reload Model related pages in the browser. I may then write a dedicated `wakanda-reload` task allowing to reload either a model or a whole solution.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* [v0.1.3](https://github.com/AMorgaut/grunt-wakanda/releases/tag/v0.1.3): Add the `wait` option
* [v0.1.2](https://github.com/AMorgaut/grunt-wakanda/releases/tag/v0.1.2): Start the Wakanda Server and Open Admin page in the browser

## References:

* [Wakanda Web Application Server Overview](http://www.wakanda.org/web-application-server)
* [Administrating-Wakanda-Server](http://doc.wakanda.org/Command-Line-Access/Administrating-Wakanda-Server-Unix.300-583228.en.html)
* [Evaluating a JS script](http://doc.wakanda.org/Command-Line-Access/Evaluating-a-JS-script.300-958090.en.html)


## License (MIT License)

Copyright (c) 2014 Alexandre Morgaut. 

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
