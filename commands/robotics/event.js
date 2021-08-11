const Discord = require("discord.js");
const fetch = require("node-fetch");
const { TBAAPI } = require("../../config.json");

module.exports = {
    name: "frcevent",
    description: "info about a frc event",
    aliases: ["frce"],
    async execute(message, args, cmd, client, Discord) {
        try {
            // fetches info about (name) in different countries <options 1> andfetches info about vaccinations in different countries <options2>

            if(args[0] === undefined) {
                messaeg.chanel.send("please send a valid event");
            }

            const event = args[0];

            const options1 = await fetch(
                `https://www.thebluealliance.com/api/v3/event/${event}`,
                {
                    headers: {
                        "X-TBA-Auth-Key": TBAAPI,
                    },
                }
            );

            // converting variables to be a readable json format
            const json = await options1.json();

            // logging the consts for debugging purposes
            console.log(json);

            const embed = new Discord.MessageEmbed()
                        .setAuthor(json.name)
                        .setTitle(json.first_event_code + " " + json.year)
                        .setURL(json.website)

                        .setDescription(
                            `**Location: ** ${json.location_name}` +
                                "\n" +
                                `**City: ** ${json.city}` +
                                "\n" +
                                `**Country: ** ${json.country}` +
                                "\n" +
                                `**Start Date: ** ${json.start_date}` +
                                "\n" +
                                `**End Date: ** ${json.end_date}` +
                                "\n" +
                                `**Event Type: ** ${json.event_type_string}`
                        )

            // sending info the Discord in embed form

            await message.channel
                .send({ embeds: [embed]})

                //error checking
                .catch((err) => {
                    message.channel.send(
                        "An error occured with the following message: " +
                            err.message
                    );
                });
        } catch (err) {
            console.error(err);
            message.channel.send("Please send a valid event");
        }
    },
};
