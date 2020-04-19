const asyncRedis = require("async-redis");
const client = asyncRedis.createClient();

const { publish } = require('./event')

async function redisSubscriber(){
	client.on('message', function(channel, message){
        publish(message)
    });

await client.subscribe('UPDATED_VIEW')

}

module.exports = redisSubscriber