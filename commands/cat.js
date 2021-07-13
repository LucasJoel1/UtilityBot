const fetch = require('node-fetch');

exports.run = async (bot,message,args) => {
    fetch('https://aws.random.cat/meow').then(response => response.json());
    const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
    message.channel.send(file);
}
exports.help = {
    name: 'cat'
}