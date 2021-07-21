const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "covid",
    description: "get info on covid staistics",
    aliases: ["covid-19", "covidStats", "covid-stats"],
    async execute(message, args, cmd, client, Discord) {
        try {
            // fetches info about covid in different countries <options 1> andfetches info about vaccinations in different countries <options2>

            const options1 = await fetch(
                `https://disease.sh/v3/covid-19/countries/${args[0]}`
            );

            const options2 = await fetch(
                `https://disease.sh/v3/covid-19/vaccine/coverage/countries/${args[0]}?lastdays=1&fullData=true`
            );

            // converting variables to be a readable json format
            const json = await options1.json();
            const json2 = await options2.json();
            // creating a const to get info about lists
            const total = json2.timeline[0].total;

            // logging the consts for debugging purposes
            console.log(json);
            console.log(json2);

            // sending info the Discord in embed form

            await message.channel
                .send(
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
                `
                        )
                        .setThumbnail(json.countryInfo.flag)
                        .setColor("#536DFE")
                        .setFooter("Powered by disease.sh")
                )
                //error checking
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
