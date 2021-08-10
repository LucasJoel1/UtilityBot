// Importing dependencies
require("dotenv").config();
const { PREFIX } = require("../../config.json");
const {MessageButton} = require('discord.js');

module.exports = (Discord, client, message) => {

    // stating prefix
    const prefix = PREFIX;
    // checking if the message has the prefix or the author is the bot
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift();

    const command =
        client.commands.get(cmd) ||
        // adds aliase functionality
        client.commands.find((a) => a.aliases && a.aliases.includes(cmd));

    try {
        command.execute(message, args, cmd, client, Discord);
    } catch (
        err // error checking
    ) {
        message.reply(
            ":x: There was an error trying to execute this command or it does not exist in our database"
        );
        console.log;
    }
};
