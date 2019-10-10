# Rabbit MQ

This is the hotel assignment, a offer for an avalible room is send out on the `offer` RabbitMQ channel, and the client there is listening to this que can choose to answer back on a `answer` channel.


# Run Rabbir mq

`sudo docker run -d --rm -p 5672:5672 -p 15672:15672 --name localrabbit rabbitmq:3-management`

The RabbitMQ dashboard can now be viewed at `http://localhost:15672` user: guest, password: guest

# Run the server

Run the server, and see some events come back for the bookings

`sudo docker run --link localrabbit:rabbitmq bslcphbussiness/si-rabbitmq node server.js`

 [x] Sent offer for 14pm
 [x] Sent offer for 14pm
 [x] Sent offer for 12pm
Offer for offer for 12pm has been accepted
 [x] Sent offer for 14pm
 [x] Sent offer for 10pm
Offer for offer for 10pm has been accepted


# And the client

Run the client there accepts some events in a new window

`sudo docker run --link localrabbit:rabbitmq bslcphbussiness/si-rabbitmq node client.js`

 [x] Received offer for 14pm
going to accept:  false
 [x] Received offer for 14pm
going to accept:  false
 [x] Received offer for 14pm
going to accept:  false
 [x] Received offer for 12pm
going to accept:  true
 [x] Received offer for 14pm
going to accept:  false
 [x] Received offer for 10pm
going to accept:  true