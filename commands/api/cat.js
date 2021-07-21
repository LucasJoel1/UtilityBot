// Importing dependencies
const fetch = require('node-fetch');

module.exports = {
    name: 'cat',
    aliases: ['kitty'],
    description: 'pull up a random cat photo',
    async execute(message, args, cmd, client, Discord) {
        // fetches api
        fetch('https://aws.random.cat/meow').then(response => response.json());
        const {
            // truns info into a const and gets info in json format
            file
        } = await fetch('https://aws.random.cat/meow').then(response => response.json());
        // sends the image of the cat
        message.channel.send(file);
    }
}