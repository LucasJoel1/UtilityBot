// Importing dependencies
const fetch = require("node-fetch");
const {
    weatherAPI
} = require("../../config.json");
const Discord = require("discord.js");

module.exports = {
    name: "weather",
    description: "get information about the weather in different locations",
    aliases: ["weatherinfo"],
    async execute(message, args, cmd, client, Discord) {
        try {
            // fetching api
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${args[0]},${args[1]}&appid=${weatherAPI}&units=metric`
            );

            // allows usablilty of info from jsons from alist using consts
            const city = args[0];
            const country = args[1];
            const json = await response.json(); // Can't unpack (deconstruct) await since it's asynchronously returned
            const icon = json.weather[0].icon;
            const main = json.weather[0].main;
            const description = json.weather[0].description;

            // logging for debugging
            console.log(json);
            console.log(`Got ${json.name}'s weather data (id: ${json.id})`);
            console.log(`${icon}`);

            const embed = new Discord.MessageEmbed()
                .setAuthor(`${json.name} Weather`)
                .setTitle(`${main}`)
                .setURL("https://openweathermap.org")
                .setDescription(
                    `
**Forecast:** ${description}
**Temperature:** ${json.main.temp}°C
**Feels Like:** ${json.main.feels_like}°C
**Country:** ${json.sys.country} 
**Wind Speed:** ${json.wind.speed} Km/h

**Longitude**: ${json.coord.lon}
**Latitude**: ${json.coord.lat}

            `
                )
                .setThumbnail(
                    `https://openweathermap.org/img/wn/${icon}@2x.png`, "https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png"
                )
                .setColor("#536DFE")
                .setFooter("Powered by OpenWeatherMap")

            // sending embed to discord from recieved message
            await message.channel
                .send({ embeds: [embed]})
                // error checking
                .catch((err) => {
                    message.channel.send(
                        "An error occured with the following message: " +
                        err.message
                    );
                });
        } catch (err) {
            console.error(err);
        }
    },
};