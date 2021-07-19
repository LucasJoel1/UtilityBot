require('dotenv').config();
module.exports = (Discord, client, message) => {
    const prefix = '-';
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    try {
        command.execute(message, args, cmd, client, Discord);
    } catch (err) {
        message.reply(':x: There was an error trying to execute this command or it does not exist in our database');
        console.log;
    }
}