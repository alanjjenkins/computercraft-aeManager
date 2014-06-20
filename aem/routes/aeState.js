var redis = require('redis'), client = redis.createClient()
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/power/on', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    client.hset('aeState', 'power', true);
    res.end('Power now on');
});
router.get('/power/off', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    client.hset('aeState', 'power', false);
    res.end('Power now off');
});
router.get('/json', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    setTimeout(function(){
        client.hgetall('aeState', function (err, reply) {
        console.dir(reply);
        res.end(JSON.stringify(reply));
        })}, 2000);
});

module.exports = router;
