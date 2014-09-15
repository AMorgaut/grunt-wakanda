# grunt-wakanda
[![NPM version](https://badge.fury.io/js/grunt-wakanda.svg)](http://badge.fury.io/js/grunt-wakanda)
[![MIT Licensed](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](#license)

*Wakanda® and 4D® are registered trademarks of 4D SAS in France and/or other countries. All other names mentioned may be trademarks or registered trademarks of their respective owners.*

> Start Wakanda Server

May be considered as a replacement for [grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect). Useful running a Wakanda Solution and its NoSQL databases. 

Uses the [Wakanda Server](http://wakanda.org) installed on the system.

*Doesn't have (yet?) a `middleware` option as grunt-contrib-connect does.*


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

Or using [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks) it could be automatically done by:

```js
require('load-grunt-tasks')(grunt);
```

## The "wakanda" task

### Usage Examples

In your project's Gruntfile, add a section named `wakanda` to the data object passed into `grunt.initConfig()`.

In this example, the default options are used to find and start Wakanda Server.
[The Wakanda Web Administration panel](http://doc.wakanda.org/Wakanda-Server-Reference-Guide/Administrating-Wakanda-Server/Wakanda-Server-Administration.300-957822.en.html) is opened so you can browse your computer files to load a solution.

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

### Options

#### Administration options

##### options.solution
Type: `String`
Default value: `''`

A string value that is used to specify the Wakanda Solution to open.
If not specified, the default solution embeded in the server is used
Should not be used at the same time than `option.script`.

##### options.script
Type: `String`
Default value: `''`

A string value that is used to specify a JavaScript file to run on Wakanda Server.
Should not be used at the same time than `option.solution`.

##### options.port
Type: `Number`
Default value: `8080`

A number value that is used to specify Wakanda Web Administration panel HTTP port number.
Note it is only accessible through HTTP from the local machine. From outside, the HTTPS protocol should be used.

##### options.ssl
Type: `Number`
Default value: `4433`

A number value that is used to specify Wakanda Web Administration panel HTTPS port number.

##### options.login
Type: `String`
Default value: `undefined`

The admin login. If specified, a login panel will first need to be filled before accessing to the Web Administration.

##### options.password
Type: `String`
Default value: `undefined`

The admin password. If specified, a login panel will first need to be filled before accessing to the Web Administration.


#### Discovery options

##### options.discovery
Type: `Boolean`
Default value: `true`

Specify if the *Bonjour* discovery service should be activated or not.


#### Debugger options

##### options.debugger
Type: `String`
Default value: `remote`

Specify which wakanda debugger and debugger protocol to activate

* 'remote': The embedded Web Inspector via the webkit debugger protocol 
* 'wakanda': The Wakanda Studio debugger via the Crossfire debugger protocol
* 'none': No debugger is activated


#### Logging facility options

##### options.syslog
Type: `Boolean`
Default value: `false`

Forward Wakanda Server's log messages to the Syslog daemon

##### options.netdump
Type: `Boolean`
Default value: `false`

Net dump

#### Utils options

##### options.wversion
Type: `Boolean`
Default value: `false`

Returns the Wakanda Server version instead of starting it

##### options.whelp
Type: `Boolean`
Default value: `false`

Returns the Wakanda Server native command line help. Mostly used for the development of this task itself in combination of the official documentation


#### Task options

##### options.bin
Type: `String`
Default value: `''`

Specify the Wakanda Server build to run.
If not specified, the default os specific path is used

##### options.host
Type: `String`
Default value: `"127.0.0.1"`

The host that is meant to be used by Wakanda Server.

##### options.wait
Type: `Boolean`
Default value: false

Used to block task execution until the server is started. 
This option isn't necessary if `open` is activated (as open is already waiting for the server to be ready).

##### options.keepalive
Type: `Boolean`
Default value: false

Used to block task execution once the server is started (and once the browser open is 'open' is true)

##### options.leavealive
Type: `Boolean`
Default value: false

Used to maintain the server started once grunt exit.

##### options.open
Type: `Boolean`
Default value: false

Used to open the Web Administration page in the browser.


### Task events

#### wakandaReady

Emited on `grunt.event` once the Wakanda HTTP server is ready

#### wakandaExit

Emited on `grunt.event` when the Wakanda child process is killed

#### wakandaExitRequest

Listened on `grunt.event` to kill the Wakanda child process if still alive



## Todo

### Unit Tests fix

Need to find out how to make the unit tests work properly. Currently trying to stop the server from an emitted grunt event so it can be restarted with different options from other tests. Any help welcome ;-) 

### IP address / host

The task could fix the `host` option default value from the Wakanda server output


### watch / reload

For dev mode we should be able to have the solution or the Model reload when they are modified.

So Either:

* Write a dedicated "friend" `wakanda-reload` task 
* Handle events such as `wakandaReloadModelRequest` and `wakandaReloadSolutionRequest`


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* [v0.1.4](https://github.com/AMorgaut/grunt-wakanda/releases/tag/v0.1.4): Add support to most the command line options + experimental events
* [v0.1.3](https://github.com/AMorgaut/grunt-wakanda/releases/tag/v0.1.3): Add the `wait` option
* [v0.1.2](https://github.com/AMorgaut/grunt-wakanda/releases/tag/v0.1.2): Start the Wakanda Server and Open Admin page in the browser

## References:

* [Wakanda Web Application Server Overview](http://www.wakanda.org/web-application-server)
* [Administrating-Wakanda-Server](http://doc.wakanda.org/Command-Line-Access/Administrating-Wakanda-Server-Unix.300-583228.en.html)
* [Evaluating a JS script](http://doc.wakanda.org/Command-Line-Access/Evaluating-a-JS-script.300-958090.en.html)


## License

*The MIT License*

Copyright (c) 2014 Alexandre Morgaut. 

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
