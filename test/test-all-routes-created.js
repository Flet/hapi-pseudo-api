var Lab = require('lab');
var Hapi = require('hapi');
var _ = require('lodash');

var lab = exports.lab = Lab.script();
var pseudoAPI = require('../');

lab.experiment('hapi-pseudo-api', function () {
    var server = new Hapi.Server(),
        opts = require('./data.js'),
        result;

    lab.test('Plugin successfully loads', function (done) {

        server.pack.register({
            plugin: pseudoAPI,
            options: opts
        }, function (err) {
            Lab.expect(err).to.equal(undefined);
            done();
        });
    });

    var path = '/api/';

    lab.test('Plugin registers things routes', function (done) {
        var table = server.table();
        var thingsPath = path + 'things';
        var thingsPathWithId = thingsPath + '/{id}';

        var getPath = _.findWhere(table, {
            path: thingsPath,
            method: 'get'
        });
        result = Lab.expect(getPath).to.exist;

        var getIdPath = _.findWhere(table, {
            path: thingsPathWithId,
            method: 'get'
        });
        result = Lab.expect(getIdPath).to.exist;

        var postPath = _.findWhere(table, {
            path: thingsPath,
            method: 'post'
        });
        result = Lab.expect(postPath).to.exist;

        var deletePath = _.findWhere(table, {
            path: thingsPathWithId,
            method: 'delete'
        });
        result = Lab.expect(deletePath).to.exist;

        var putPath = _.findWhere(table, {
            path: thingsPathWithId,
            method: 'put'
        });
        result = Lab.expect(putPath).to.exist;

        done();
    });

    lab.test('Plugin registers places routes', function (done) {
        var table = server.table();
        var placesPath = path + 'places';
        var placesPathWithId = placesPath + '/{id}';

        var getPath = _.findWhere(table, {
            path: placesPath,
            method: 'get'
        });
        result = Lab.expect(getPath).to.exist;

        var getIdPath = _.findWhere(table, {
            path: placesPathWithId,
            method: 'get'
        });
        result = Lab.expect(getIdPath).to.exist;

        var postPath = _.findWhere(table, {
            path: placesPath,
            method: 'post'
        });
        result = Lab.expect(postPath).to.exist;

        var deletePath = _.findWhere(table, {
            path: placesPathWithId,
            method: 'delete'
        });
        result = Lab.expect(deletePath).to.exist;

        var putPath = _.findWhere(table, {
            path: placesPathWithId,
            method: 'put'
        });
        result = Lab.expect(putPath).to.exist;

        done();
    });
});