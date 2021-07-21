// Importing dependencies
const Discord = require("discord.js");
const client = new Discord.Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
// Importing information from config.json hich store my bot token and api keys
const { token, prefix, weatherAPI, catAPI, dogAPI } = require("./config.json");

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

["command_handler", "event_handler"].forEach((handler) => {
    require(`./handlers/${handler}`)(client, Discord);
});

// Starts bot when <npm start> is used
client.login(token);
