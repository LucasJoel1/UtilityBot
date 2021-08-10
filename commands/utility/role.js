module.exports = {
    name: "role",
    aliases: ["roleCreate", "createRole"],
    description: "Create a role",

    async execute(message, args, cmd, client, Discord) {
        if (!message.member.permissions.has("BAN_MEMBERS"))
            return message.channel.send("Insefficiant Permissions");

        if(args[0].includes)
        message.guild.roles.create({
            data: {
                name: args[0].replace(/-/g, ' '),
                color: args[1],
                Permissions: args[2]
            },
        });

        const role = {
            name: args[0].replace(/-/g, ' '),
            color: args[1],
            Permissions: args[2]
        }

        const embed = new Discord.MessageEmbed()
                    .setTitle("Role created")
            .setDescription(`The role ${role.name} has been created`)
            .setColor(role.color)

        // if (console.error) {
        //     message.channel.send("an error has occured");
        // } else {
            message.channel.send({ embeds: [embed]});
        // }
    },
};
