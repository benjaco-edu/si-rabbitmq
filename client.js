const amqp = require('amqplib');

(async() => {
    const connection = await amqp.connect('amqp://rabbitmq')
    const channel = await connection.createChannel();
    channel.assertQueue('offers', {durable: false });
    channel.assertQueue('answers', {durable: false });

    channel.consume('offers', function(msg) {
        let accept = Math.random()>.5;

        console.log(" [x] Received %s", msg.content.toString());
        console.log("going to accept: ", accept)


        if(accept){
            channel.sendToQueue("answers", Buffer.from(JSON.stringify([msg.content.toString(), accept])));
        }
    }, {
        noAck: true
    });

})();
