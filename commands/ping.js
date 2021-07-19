module.exports = {
    name: 'ping',
    description: 'get the latency of the client and bot',
    async execute(client, message, args, Discord) {
        message.channel.send(`Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    }
}