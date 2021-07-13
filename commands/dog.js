const fetch = require('node-fetch');
const {dogAPI} = require('../config.json');

exports.run = async (bot,message,args) => {
    fetch('https://random.dog/woof.json').then(response => response.json());
    const { url } = await fetch('https://random.dog/woof.json').then(response => response.json());
    message.channel.send(url);
}
exports.help = {
    name: 'dog'
}