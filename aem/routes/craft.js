var redis = require('redis'), client = redis.createClient()
var express = require('express');
var router = express.Router();

router.param('item', function(req, res, next, id){
    req.item = id;
    next();
  });
router.param('amount', function(req, res, next, id){
    req.amount = id;
    next();
  });
router.get('/craft/:item/:amount', function(req, res) {
    // console.log(req.body.json);
    client.hmset('craft', req.item, req.amount);
    res.end('Requested to make: ' + req.amount + " of " + req.item);
});
router.get('/queue', function(req, res) {
    setTimeout(function() {
        client.hgetall('craft', function(err, reply) {
            res.end(JSON.stringify(reply));
        });
    }, 5000);
});
router.get('/queue/clear', function(req, res) {
    client.del('craft');
    res.end('Cleared crafting queue');
});
module.exports = router;
