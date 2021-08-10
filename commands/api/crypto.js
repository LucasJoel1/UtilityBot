// Importing dependencies

const fetch = require('node-fetch');
const {
    cryptoAPI
} = require('../../config.json');
const Discord = require('discord.js');
const {
    MessageEmbed
} = require('discord.js');


module.exports = {
    name: 'crypto',
    alliases: [''],
    description: 'get information of different crypto currencies',
    async execute(message, args, cmd, client, Discord) {
        try {

            // fetches info about different crypto currencies and converts it to the standard

            const response = await fetch(`https://api.nomics.com/v1/currencies/ticker?key=${cryptoAPI}&ids=${args[0]}&convert=${args[1]}&per-page=1&page=1`);

            // allows usablilty of info from jsons from a list using consts
            const ids = args[0];
            const convert = args[1];
            const json = await response.json(); // Can't unpack (deconstruct) await since it's asynchronously returned
            const price = json[0].price;
            const name = json[0].name;
            const id = json[0].id;
            const high = json[0].high;
            const max_supply = json[0].max_supply;
            const status = json[0].status;
            const circulating_supply = json[0].circulating_supply;
            const market_cap = json[0].market_cap;
            // logging the json for debugging
            console.log(json);

            const embed = new Discord.MessageEmbed()
                .setAuthor(`${name}`)
                .setTitle(`${id}`)
                .setDescription(`
**Status:** ${status}

**Price:** $${price}
**All Time High:** $${high}

**Max Supply:** ${max_supply}
**Circulating Supply:** ${circulating_supply}

**Market Capitalization:** ${market_cap}`)
                .setColor("#536DFE")
                .setFooter("Powered by Nomics", "https://www.startupinspire.com/assets/startups/5889/1578689899_nomics-logo.png")


            //send info to discord in embed form
            await message.channel.send({
                    embeds: [embed]
                })
                // error checking
                .catch(err => {
                    message.channel.send('An error occured with the following message: ' + err.message)
                });
        } catch (err) {
            console.error(err);
        }
    }
}