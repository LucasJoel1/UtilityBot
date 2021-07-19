module.exports = {
    name: 'join',
    description: 'join the vc',
    async execute(client, message, args, Discord) {
        const fs = require('fs')
        const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);

            client.commands.set(command.name, command);
        }


    }
}