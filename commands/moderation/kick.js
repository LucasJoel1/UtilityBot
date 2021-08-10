module.exports = {
    name: "kick",
    description: "kick members from a guild",
    aliases: ["remove"],
    async execute(message, args, cmd, client, Discord) {
        //checks for proper permissions
        if (!message.member.permissions.has("KICK_MEMBERS"))
            return message.channel.send("Insefficiant Permissions");
            // creates a variable and makes sure the user inputted is valid
        let member =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]);
            // error checking
        if (!member) return message.channel.send("No User Provided or Found");
        // kicks user
        member.kick();
        // information sent to channel about the kick
        message.channel.send(`user **${member.user.tag}** has been kicked`);
    },
};
