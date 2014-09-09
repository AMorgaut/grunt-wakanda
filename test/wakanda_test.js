'use strict';

var grunt = require('grunt');
var request = require('request');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.wakanda = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  default: function (test) {
    test.expect(2);
    var expected = '{"ok":true}';

    request.get('http://localhost:8080/rest/', function (err, response, body) {
      if (err) {
        return test.done();
      }

      test.equal(response.statusCode, 200);
      test.equal(body, expected, 'should return {"ok":true} if Wakanda REST Service available');

      test.done();
    });
  }
};
