var Lab = require('lab');
var Hapi = require('hapi');
var _ = require('lodash');

var lab = exports.lab = Lab.script();
var convertToPrimitive = require('../convertToPrimitive.js');


lab.experiment('hapi-pseudo-api', function () {

    lab.test('convert "true" to true', function (done) {
        Lab.expect(convertToPrimitive('true')).to.equal(true);
        done();
    });

    lab.test('convert "false" to false', function (done) {
        Lab.expect(convertToPrimitive('false')).to.equal(false);
        done();
    });

    lab.test('leave strings alone', function (done) {
        Lab.expect(convertToPrimitive('string123')).to.equal('string123');
        done();
    });

    lab.test('convert "42" to 42', function (done) {
        Lab.expect(convertToPrimitive('42')).to.equal(42);
        done();
    });

});