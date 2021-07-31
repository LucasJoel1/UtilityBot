module.exports = {
    name: "role",
    aliases: ["roleCreate", "createRole"],
    description: "Create a role",

    async execute(message, args, cmd, client, Discord) {
        if (!message.member.hasPermission("BAN_MEMBERS"))
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

        // if (console.error) {
        //     message.channel.send("an error has occured");
        // } else {
            message.channel.send(new Discord.MessageEmbed()
            .setTitle("Role created")
            .setDescription(`The role ${role.name} has been created`)
            .setColor(role.color)
            );
        // }
    },
};
