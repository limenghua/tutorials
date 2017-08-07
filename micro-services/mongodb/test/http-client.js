const restify = require('restify-clients');

const client = restify.createStringClient('http://localhost:3000');

const start = Date.now();

client.get('/',function(err,req,res,data){
    if(err){
        console.log(err);
    }
    else{
        console.log(data);
        console.log(res.headers);
        console.log("time used",Date.now() - start);
    }
});