var Lab = require('lab');
var Hapi = require('hapi');
var _ = require('lodash');

var lab = exports.lab = Lab.script();
var pseudoAPI = require('../');


lab.experiment('hapi-pseudo-api', function () {
    var server = new Hapi.Server();

    var opts = require('./data.js');

    server.pack.register({
        plugin: pseudoAPI,
        options: opts
    }, function (err) {
        if (err) throw err;
    });

    var path = '/api/';
    var thingsPath = '/api/things';
    var placesPath = '/api/places';

    lab.test('get a thing', function (done) {
        var options = {
            method: "GET",
            url: thingsPath + '/1'
        };

        server.inject(options, function (response) {
            var result = response.result;

            Lab.expect(response.statusCode).to.equal(200);
            Lab.expect(result).to.be.an('object');
            Lab.expect(result.name).to.equal(opts.data.things[0].name);
            Lab.expect(result.id).to.equal(opts.data.things[0].id);
            done();
        });
    });


    lab.test('get a place', function (done) {
        var options = {
            method: "GET",
            url: placesPath + '/2'
        };

        server.inject(options, function (response) {
            var result = response.result;

            Lab.expect(response.statusCode).to.equal(200);
            Lab.expect(result).to.be.an('object');
            Lab.expect(result.name).to.equal('work');
            Lab.expect(result.id).to.equal(2);
            done();
        });
    });


    lab.test('get a thing that has a string for an id', function (done) {
        var options = {
            method: "GET",
            url: thingsPath + '/one'
        };

        server.inject(options, function (response) {
            var result = response.result;

            Lab.expect(response.statusCode).to.equal(200);
            Lab.expect(result).to.be.an('object');
            Lab.expect(result.name).to.equal(opts.data.things[1].name);
            Lab.expect(result.id).to.equal(opts.data.things[1].id);
            done();
        });
    });


    lab.test('get all the things', function (done) {
        var options = {
            method: "GET",
            url: thingsPath
        };

        server.inject(options, function (response) {
            var result = response.result;

            Lab.expect(response.statusCode).to.equal(200);
            Lab.expect(result).to.be.an('array');
            Lab.expect(result.length).to.equal(opts.data.things.length);
            done();
        });
    });


    lab.test('get a thing that does not exist', function (done) {
        var options = {
            method: "GET",
            url: thingsPath + '/zzz'
        };

        server.inject(options, function (response) {
            var result = response.result;

            Lab.expect(response.statusCode).to.equal(404);
            done();
        });
    });

    lab.test('post a thing', function (done) {
        var totalThings = opts.data.things.length;

        var options = {
            method: "POST",
            url: thingsPath,
            payload: {
                name: "cup"
            }
        };

        server.inject(options, function (response) {
            var result = response.result;
            Lab.expect(response.statusCode).to.equal(201);
            Lab.expect(result).to.be.an('object');
            Lab.expect(result.id).to.equal(opts.data.things[2].id);
            Lab.expect(opts.data.things.length).to.equal(totalThings + 1);
            Lab.expect(result.name).to.equal("cup");
            done();
        });
    });


    lab.test('delete a thing', function (done) {
        var options = {
            method: "DELETE",
            url: thingsPath + "/1"
        };

        server.inject(options, function (response) {
            var result = response.result;

            Lab.expect(response.statusCode).to.equal(200);
            Lab.expect(result).to.be.an('object');
            Lab.expect(result.id).to.equal(1);
            Lab.expect(result.name).to.equal("chair");
            done();
        });
    });


    lab.test('delete a thing that does not exist', function (done) {
        var options = {
            method: "DELETE",
            url: thingsPath + "/37337"
        };

        server.inject(options, function (response) {
            var result = response.result;
            Lab.expect(response.statusCode).to.equal(404);
            Lab.expect(result).to.equal(null);
            done();
        });
    });

    lab.test('update a thing', function (done) {
        var options = {
            method: "PUT",
            url: thingsPath + "/one",
            payload: {
                name: "rock"
            }
        };

        server.inject(options, function (response) {
            var result = response.result;

            Lab.expect(response.statusCode).to.equal(200);
            Lab.expect(result).to.be.an('object');
            Lab.expect(result.id).to.equal('one');
            Lab.expect(result.name).to.equal("rock");
            done();
        });
    });


    lab.test('update a thing that does not exist', function (done) {
        var options = {
            method: "PUT",
            url: thingsPath + "/9999",
            payload: {
                name: "rock"
            }
        };

        server.inject(options, function (response) {
            var result = response.result;

            Lab.expect(response.statusCode).to.equal(404);
            Lab.expect(result).to.equal(null);
            done();
        });
    });


});