var dateutil = require('../util/dateutil'),
dynamo = require("./../models/dynamo.js"),
moment = require('moment');

getRecommendedJobs=function(req,res){	
	if(!req.params.userid){
		res.status(400).json({
			status : 400,
			message : "Bad Request"
		});
	}else{
		dynamo.getUserItems("jobRecommendation",req.params.userid,function(err,response){
			if(err){
				console.log(err);
				res.status(500).json({status:500,message : "Error while retrieving data"});
			}else{
				console.log(JSON.stringify(response));
				var result = {userid :response.Items[0].userid.S,
						jobreco :response.Items[0].jobreco.NS
				};	

				var data= [];
				async.each(result.jobreco,
						// 2nd param is the function that each item is passed to
						function(row, callback){
					dynamo.getJobItems("job",row,function(err,response){
						if(err){
							console.log(err);
							res.status(500).json({status:500,message : "Error while retrieving data"});
						}else{
							console.log(response);
							var result = {
									jobid: response.Items[0].jobid.S,
									title : response.Items[0].title.S,
									company : response.Items[0].company.S,
									loc : response.Items[0].loc.S,
									details : response.Items[0].details.S,
									created : response.Items[0].created.S,
									modified : response.Items[0].modified.S
							};
							console.log("Result: " + JSON.stringify(result));
							data.push(result);
							callback();
						}
					 });
					},
					// 3rd param is the function to call when everything's done
					function(err){
						console.log(" ITEMS::" + JSON.stringify(data));
						res.writeHead(200, {"Content-type" : "application/json"});
						res.end(JSON.stringify(data));
					});
				
				}//inner else
			});
		}
	};

	exports.getRecommendedJobs = getRecommendedJobs;