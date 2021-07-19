module.exports = {
    name: 'ping',
    aliases: ['pong', 'latency'],
    description: 'get the latency of the client and bot',
    async execute(message, args, cmd, client, Discord) {
        message.channel.send(`Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    }
}