var _ = require('lodash');
var lowdb = require('lowdb');
var convertToPrimitive = require('./convertToPrimitive.js');


var defaults = {
    data: {},
    rootPath: '/api/',
    idProperty: 'id',
    delay: 0
};

exports.register = function (plugin, options, next) {

    if(options.path) {
        //if there is a path, then that is the directory of json to load using requiredirectory
    }

    var opts = _.defaults(options, defaults);

    var buildRestEndpoints = function (name, data) {
        var resourcePath = opts.rootPath + name;
        var resourcePathWithId = resourcePath + '/{' + opts.idProperty + '}';

        plugin.route({
            method: 'GET',
            path: resourcePath,
            handler: function (request, reply) {
                _.delay(function () {
                    reply(lowdb(name).value());
                }, opts.delay);
            }
        });

        plugin.route({
            method: 'GET',
            path: resourcePathWithId,
            handler: function (request, reply) {
                var id = convertToPrimitive(request.params[opts.idProperty]);
                var foundResource = lowdb(name).get(id).value();
                _.delay(function () {
                    reply(foundResource).code(foundResource ? 200 : 404);
                }, opts.delay);
            }
        });

        plugin.route({
            method: 'POST',
            path: resourcePath,
            handler: function (request, reply) {
                var newResource = lowdb(name).insert(request.payload).value();
                _.delay(function () {
                    reply(newResource).code(201);
                }, opts.delay);
            }
        });

        plugin.route({
            method: 'DELETE',
            path: resourcePathWithId,
            handler: function (request, reply) {
                var id = convertToPrimitive(request.params[opts.idProperty]);
                var deletedResource = lowdb(name).remove(id).value();
                _.delay(function () {
                    reply(deletedResource).code(deletedResource ? 200 : 404);
                }, opts.delay);
            }
        });

        plugin.route({
            method: 'PUT',
            path: resourcePathWithId,
            handler: function (request, reply) {
                var id = convertToPrimitive(request.params[opts.idProperty]);
                var updatedResource = lowdb(name).update(id, request.payload).value();
                _.delay(function () {
                    reply(updatedResource).code(updatedResource ? 200 : 404);
                }, opts.delay);
            }
        });
    };


    lowdb.db = opts.data;

    Object.keys(opts.data).forEach(function (keys) {
        buildRestEndpoints(keys);
    });

    next();
};


// the pkg attribute will make the plugin name/version match package.json
exports.register.attributes = {
    pkg: require("./package.json")
};