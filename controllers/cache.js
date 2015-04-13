/**
 * New node file
 */
var redis = require('redis');
var client = redis.createClient(6379,"replica282-001.halkdi.0001.usw2.cache.amazonaws.com");
var data=[{
	"name":"sambu",
	"lname":"gopan"
},
{
	"name":"sam",
	"lname":"gop"
}
];

redistrial=function(res,req){

client.on('connect', function(err,reply) {
	console.log('3');
	if(err){
		console.log('cache is not available');
		}else{
    console.log('connected');
		}
});

client.set('framework1', JSON.stringify(data),function(err,reply){
	console.log('1');
	client.get('framework1',function(err,reply){
		console.log('2');
		if (reply == null) {
			console.log('here');
	       req.end('/cache');
	    } else {
	    	console.log('there');
	    	jsonobj=JSON.parse(reply);
	        req.end(JSON.stringify(jsonobj));
	    }
	});
	console.log('dissapointed');
});

};

exports.redistrial=redistrial;
