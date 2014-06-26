var REDIS_HOST = process.env.REDIS_HOST || "localhost";
var REDIS_PORT= process.env.REDIS_PORT || 6379;

var client = require('redis').createClient(REDIS_PORT,REDIS_HOST);
exports.client = client;
