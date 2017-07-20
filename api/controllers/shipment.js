"use strict"
const cassandra = require('cassandra-driver');
var  cassClient  = new cassandra.Client({contactPoints: ['10.0.0.7'],keyspace:'keyspaceName'}); 

//This api returns list of shipments 
exports.get_all_shipments =  function (req,res,next){

    var query ="select * from keyspaceName.tablename";
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
            console.log("Number of records found : " + result.rows.length);
            res.contentType('application/json');
            res.status(200).send(JSON.stringify(result.rows));
        }
        else{
            console.log("No records found : " );        
            console.log("Shutting down...");
        }
    })
    .catch (function(error){
        console.log(error);
        return cassClient.shutdown();
    });
};

