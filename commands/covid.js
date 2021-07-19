const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'covid',
    description: 'get info on covid staistics',
    async execute(client, message, args, Discord) {
        try {
            // fetch normally uses Promises, which use a .catch to handle errors.
            // async/await requires us to use try/catch instead to handle errors.

            // Can't unpack (deconstruct) await since it's asynchronously returned

            const options1 = await fetch(`https://disease.sh/v3/covid-19/countries/${args[0]}`);

            const options2 = await fetch(`https://disease.sh/v3/covid-19/vaccine/coverage/countries/${args[0]}?lastdays=1&fullData=true`)

            const country = args[0]
            const json = await options1.json();
            const json2 = await options2.json();
            const total = json2.timeline[0].total;

            console.log(json);
            console.log(json2);



            await message.channel.send(
                    new Discord.MessageEmbed()
                    .setAuthor(`Covid Cases in ${json.country}`)
                    .setTitle(`COVID-19`)
                    .setURL("https://disease.sh")
                    .setDescription(
                        `
    **Cases**
        > **Total Cases:** ${json.cases}
        > **Todays Cases:** ${json.todayCases}
        > **Active Cases:** ${json.active}
        > **Critical Cases:** ${json.critical}
        > **Cases Per One Million People:** ${json.casesPerOneMillion}
        > **Active Cases Per million People:** ${json.activePerOneMillion}
    
    **Deaths**
        > **Total Deaths:** ${json.deaths}
        > **Todays Deaths:** ${json.todayDeaths}
        > **Deaths Per One Million People:** ${json.deathsPerOneMillion}
    
    **Recovered**
        > **Total Recovered:** ${json.recovered}
        > **Todays Recovered:** ${json.todayRecovered}
        > **Recovered Per One Million People:** ${json.recoveredPerOneMillion}
    
    **Tests**
        > **Total Tests:** ${json.tests}
        > **Tests Per One Million People:** ${json.testsPerOneMillion}
    
    
    **Vaccinated**
        > **Total** ${total}
                `)
                    .setThumbnail(json.countryInfo.flag)
                    .setColor("#536DFE")
                    .setFooter("Powered by disease.sh")
                )
                .catch(err => {
                    message.channel.send('An error occured with the following message: ' + err.message)
                });
        } catch (err) {
            console.error(err);
        }
    }
}