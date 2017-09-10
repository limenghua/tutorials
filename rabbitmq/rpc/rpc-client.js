const amqp = require('amqplib/callback_api');

const args = process.argv.slice(2);

if(args.length ==0){
    console.log("Usage: node rpc-client.js num");
    process.exit();
}

amqp.connect('amqp://localhost',(err,conn)=>{
    conn.createChannel((err,ch)=>{
        ch.assertQueue('',{exclusive:true},(err,q)=>{
            let corr = generateUuid();
            let num = parseInt(args[0]);

            console.log(' [x] Request fib %d',num);

            ch.consume(q.queue,(msg)=>{
                if(msg.properties.correlationId == corr){
                    console.log(' [.] Got %s',msg.content.toString());
                    setTimeout(()=>{
                        conn.close();
                        process.exit(0);
                    },500);
                }
            });

            ch.sendToQueue('rpc_queue',
                new Buffer(num.toString()),
                {correlationId:corr,replyTo:q.queue});

        });
    });
});

function generateUuid() {
  return Math.random().toString() +
         Math.random().toString() +
         Math.random().toString();
}