const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost',function(err,conn){
    conn.createChannel(function(err,ch){
        let q = 'hello';

        ch.assertQueue(q,{durable:false});

        ch.sendToQueue(q,new Buffer('Hello World!'));

        console.log(" [x] Send 'Hello World!'");
    });

    setTimeout(function(){
        conn.close();
        process.exit(0);
    },500);
});