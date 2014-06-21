var redis = require('redis'), client = redis.createClient()
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    client.hget('aeStored', 'json', function(err, reply) {
        res.end(reply);
    });
    // res.end('Power now on');
});
// router.get('/json', function(req, res) {
//     // if(req.method == 'POST') {
//     //     
//     // }
//     // else {
//     //     res.writeHead(200, {'Content-Type': 'text/javascript'});
//     //     setTimeout(function(){
//     //         client.hgetall('aeState', function (err, reply) {
//     //         console.dir(reply);
//     //         res.end(JSON.stringify(reply));
//     //         })}, 2000);
//     // }
// });

router.post('/update', function(req, res) {
    client.hmset('aeStored', 'json', req.body.json);
    // setTimeout(function(){
    //     client.hgetall('aeState', function (err, reply) {
    //     console.dir(reply);
    //     res.end(JSON.stringify(reply));
    //     })}, 2000);
});

module.exports = router;
