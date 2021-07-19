const fetch = require('node-fetch');

module.exports = {
    name: 'cat',
    description: 'pull up a random cat photo',
    async execute(client, message, args, Discord) {
        fetch('https://aws.random.cat/meow').then(response => response.json());
        const {
            file
        } = await fetch('https://aws.random.cat/meow').then(response => response.json());
        message.channel.send(file);
    }
}