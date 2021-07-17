const fetch = require('node-fetch');
const { cryptoAPI } = require('../config.json');
const Discord = require('discord.js');

exports.run = async (bot, message, [ids, convert, ]) => {
    try {
        // fetch normally uses Promises, which use a .catch to handle errors.
        // async/await requires us to use try/catch instead to handle errors.
         
        const response = await fetch(`https://api.nomics.com/v1/currencies/ticker?key=${cryptoAPI}&ids=${ids}&convert=${convert}&per-page=1&page=1`);
        const json = await response.json(); // Can't unpack (deconstruct) await since it's asynchronously returned
        const price = json[0].price;
        const name = json[0].name;
        const id = json[0].id;
        const high = json[0].high;
        const max_supply = json[0].max_supply;
        const status = json[0].status;
        const circulating_supply = json[0].circulating_supply;
        const market_cap = json[0].market_cap;
        console.log(json);



        await message.channel.send(
            new Discord.MessageEmbed()
            .setAuthor (`${name}`)
            .setTitle (`${id}`)
            .setDescription 
            (`
**Status:** ${status}

**Price:** $${price}
**All Time High:** $${high}

**Max Supply:** ${max_supply}
**Circulating Supply:** ${circulating_supply}

**Market Capitalization:** ${market_cap}`)
            .setColor ("#536DFE")
            .setFooter("Powered by Nomics")
        )
            .catch(err => {
                message.channel.send('An error occured with the following message: ' + err.message)
            });
        //message.channel.send(/* do something with the data*/);
    } catch (err) {
        console.error(err);
    }
}

exports.help = {
    name: 'crypto'
}