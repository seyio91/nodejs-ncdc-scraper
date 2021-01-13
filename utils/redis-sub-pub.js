const asyncRedis = require("async-redis");
const { prod, dev, env } = require('./keys')
let redisConfig = env == 'PROD'? prod : dev;
const client = asyncRedis.createClient(redisConfig);

const { publish } = require('./event')

async function redisSubscriber(){
	client.on('message', function(channel, message){
        publish(message)
    });

await client.subscribe('UPDATED_VIEW')

}

module.exports = redisSubscriber