const amqp = require('amqplib');

(async() => {
    const connection = await amqp.connect('amqp://rabbitmq')
    const channel = await connection.createChannel();
    channel.assertQueue('offers', {durable: false });
    channel.assertQueue('answers', {durable: false });


    setInterval(_=> {
        var msg = 'offer for '+(Math.floor(Math.random()*5)+10)+'pm';
        channel.sendToQueue("offers", Buffer.from(msg));

        console.log(" [x] Sent %s", msg);

    }, 5000)


    channel.consume('answers', function(msg) {
        let [offer, accepted] = JSON.parse(msg.content.toString())
        if(accepted)
            console.log(`Offer for ${offer} has been accepted`);
    }, {
        noAck: true
    });

})()