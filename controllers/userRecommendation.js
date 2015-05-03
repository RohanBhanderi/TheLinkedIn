var dateutil = require('../util/dateutil'),
dynamo = require("./../models/dynamo.js"),
moment = require('moment');

getRecommendedUsers=function(req,res){	
	if(!req.params.userid){
		res.status(400).json({
			status : 400,
			message : "Bad Request"
		});
	}else{
		dynamo.getUserItems("userRecommendation",req.params.userid,function(err,response){
			if(err){
				console.log(err);
				res.status(500).json({status:500,message : "Error while retrieving data"});
			}else{
				console.log(JSON.stringify(response));
				var result = {userid :response.Items[0].userid.S,
						recommendations :response.Items[0].reco.NS
				};	

				var data= [];

				async.each(result.recommendations,
						// 2nd param is the function that each item is passed to
						function(row, callback){

					dynamo.getUserItems("userdetails",row,function(err,response){
						if(err){
							console.log(err);
							res.status(500).json({status:500,message : "Error while retrieving data"});
						}else{
							console.log(response);
							var result = {
									userid: response.Items[0].userid.S,
									firstname : response.Items[0].firstname.S,
									lastname : response.Items[0].lastname.S,
									email:response.Items[0].email.S,
									headline : response.Items[0].headline.S,
									dob : response.Items[0].dob.S,
									summary : response.Items[0].summary.S
							};
							// response.Items.forEach(function(item){
							// 	result.push({
							// 		userid : item.userid.S,
							// 		motto : item.motto.S,
							// 		url : item.url.S,
							// 		overview : item.overview.S
							// 	});
							// });
							// JSON.stringify(result)
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

	exports.getRecommendedUsers = getRecommendedUsers;