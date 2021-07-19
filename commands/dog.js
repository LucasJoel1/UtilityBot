const fetch = require('node-fetch');
const {
    dogAPI
} = require('../config.json');

module.exports = {
    name: 'dog',
    aliases: ['doggy'],
    description: 'pull up a random dog photo',
    async execute(message, args, cmd, client, Discord) {
        fetch('https://random.dog/woof.json').then(response => response.json());
        const {
            url
        } = await fetch('https://random.dog/woof.json').then(response => response.json());
        message.channel.send(url);
        console.log("command");
    }
}