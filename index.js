const Discord = require('discord.js');
const bot = new Discord.Client();
const { token, prefix, weatherAPI} = require('./config.json');
bot.commands = new Discord.Collection();
const fs = require("fs");

bot.on('ready', () => {
    console.log('Bot Online')

    fs.readdir('./commands', (err, files) => {
        if(err) return console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() == 'js')

        if(jsfile.length == 0) {return console.log("NO COMMANDS FILES FOUND")}

        jsfile.forEach(f => {
            let props = require(`./commands/${f}, ./logs/${f}`);
            bot.commands.set(props.help.name, props)
        })
    })
})

bot.on('message', (message) => {
    if(message.author.bot) return;

    let MessageArray = message.content.split(' ');
    let cmd = MessageArray[0].slice(prefix.length)
    let args = MessageArray.slice(1)
    if(!message.content.startsWith(prefix)) return;

    let commandFile = bot.commands.get(cmd);
    if(commandFile){
        commandFile.run(bot, message,args)
    }
})

bot.on

bot.login(token);