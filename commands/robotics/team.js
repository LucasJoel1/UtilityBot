const Discord = require("discord.js");
const { MessageEmbed, messageCreate } = require('discord.js');
const fetch = require("node-fetch");
const { TBAAPI } = require("../../config.json");

module.exports = {
    name: "frcteam",
    description: "get info about an frc team",
    aliases: ["frct"],
    async execute(message, args, cmd, client, Discord) {
        try {
            // fetches info about (name) in different countries <options 1> andfetches info about vaccinations in different countries <options2>
            if (args[0] === null) {
                m.channel.send("please send a team name");
            }
            const teamNumber = args[0];

            const frcTeamNumber = "frc" + teamNumber;

            const options1 = await fetch(
                `https://www.thebluealliance.com/api/v3/team/${frcTeamNumber}`,
                {
                    headers: {
                        "X-TBA-Auth-Key": TBAAPI,
                    },
                }
            );
            const options2 = await fetch(
                `https://www.thebluealliance.com/api/v3/team/${frcTeamNumber}/awards`,
                {
                    headers: {
                        "X-TBA-Auth-Key": TBAAPI,
                    },
                }
            );

            // converting variables to be a readable json format
            const json = await options1.json();
            const json2 = await options2.json();

            const awards = { 0: 0, 1: 0, 2: 0, 3: 0 };
            json2.forEach(({ award_type }) => awards[award_type]++);

            const website = json.website.toLowerCase();
            console.log(website);

            const embed = new Discord.MessageEmbed()
                                    .setTitle(teamNumber)
                        .setAuthor(json.nickname)
                        .setURL(`https://www.thebluealliance.com/team/${teamNumber}`)
                        .setDescription(
                            `**School:** ${json.school_name}` +
                                "\n" +
                                `**Country:** ${json.country}` +
                                "\n" +
                                `**State/Province:** ${json.state_prov}` +
                                "\n" +
                                `**City:** ${json.city}` +
                                "\n" +
                                `**Website:** ${website}` +
                                "\n" +
                                `\n` +
                                `**AWARDS**` +
                                "\n" +
                                `    > **Wins:** ${awards["1"]}` +
                                "\n" +
                                `    > **Chairman's:** ${awards["0"]}` +
                                "\n" +
                                `    > **Finalists:** ${awards["2"]}` +
                                "\n" +
                                `    > **Woodie Flowers:** ${awards["3"]}`
                        )
                        .setFooter(
                            "Powered By The Blue Alliance API",
                            "https://play-lh.googleusercontent.com/XJMfH3PCD9Vy2J5sg3d1sew4IFf2BIgtCpg921n0F2lQyMvmOhrsoY9UIqqrm_5GLw"
                        )

            // logging the consts for debugging purposes
            console.log(json);
            await message.channel.send({ embeds: [embed]})
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
