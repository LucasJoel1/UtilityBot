// Importing dependencies
const Discord = require("discord.js");
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

console.log("starting bot");
// Importing information from config.json hich store my bot token and api keys
const {
    token,
    prefix,
    weatherAPI,
    catAPI,
    dogAPI
} = require("./config.json");

client.commands = new Collection();
client.events = new Collection();

["command_handler", "event_handler"].forEach((handler) => {
    require(`./handlers/${handler}`)(client, Discord);
});

// Starts bot when <npm start> is used
client.login(token);