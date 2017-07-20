"use strict"
const cassandra = require('cassandra-driver');
var  cassClient  = new cassandra.Client({contactPoints: ['10.0.0.7'],keyspace:'cf_web'}); 

//This api returns list of shipments 
exports.get_all_shipments =  function (req,res,next){

    var query ="select status, shipment_data, route_info, geo_fence, monitor_info, provision_data from cf_web.shipment_details";
    var username = "";
    if(req.query.username){
        query += " where created_by = ? ALLOW FILTERING"
        username = req.query.username;
        console.log(username);
    }
    console.log(query);
    cassClient.connect ()
    .then(function(){
        if(req.query.username){
            return cassClient.execute(query,[username],{prepare:true});
        }
        else{
            return cassClient.execute(query);
        }
    })
    .then(function(result){
        console.log("got the result ");
    
        if(result != null){
            console.log("Number of shipments found : " + result.rows.length);
            res.contentType('application/json');
            res.status(200).send(JSON.stringify(result.rows));
        }
        else{
            console.log("No shipments found : " );        
            console.log("Shutting down...");
        }
    })
    .catch (function(error){
        console.log(error);
        return cassClient.shutdown();
    });
};

