var redis = require('redis'), client = redis.createClient()
var express = require('express');
var router = express.Router();

router.post('/json', function(req, res) {
    // console.log(req.body.json);
    client.hmset('aeCaps', 'json', req.body.json);
    res.end('you posted: ' + req.body.json);
});
router.get('/json', function(req, res) {
    client.hget('aeCaps', 'json', function(err, reply) {
        res.end(reply);
    });
});
module.exports = router;
