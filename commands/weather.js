const fetch = require('node-fetch');
const { weatherAPI } = require('../config.json');
const Discord = require('discord.js');

exports.run = async (bot, message, [city, country, units]) => {
    try {
        // fetch normally uses Promises, which use a .catch to handle errors.
        // async/await requires us to use try/catch instead to handle errors.
         
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${weatherAPI}&units=metric`);
        const json = await response.json(); // Can't unpack (deconstruct) await since it's asynchronously returned
        const icon = json.weather[0].icon;
        const main = json.weather[0].main;
        const description = json.weather[0].description
        const sunrise = Date.parse(json.sys.sunrise)

        console.log(json);
        console.log(`Got ${json.name}'s weather data (id: ${json.id})`);
        console.log(`${icon}`)
        console.log(sunrise)


        await message.channel.send(
            new Discord.MessageEmbed()
            .setAuthor (`${json.name} Weather`)
            .setTitle (`${main}`)
            .setDescription (
                `
**Forecast:** ${description}
**Temperature:** ${json.main.temp}°C
**Feels Like:** ${json.main.feels_like}°C
**Country:** ${json.sys.country} 
**Wind Speed:** ${json.wind.speed} Km/h

**Longitude**: ${json.coord.lon}
**Latitude**: ${json.coord.lat}

            `)
            .setThumbnail (`https://openweathermap.org/img/wn/${icon}@2x.png`)
            .setColor ("#536DFE")
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
    name: 'weather'
}