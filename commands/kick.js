module.exports = {
    name: 'kick',
    description: 'kick members from a guild',
    async execute(client, message, args, Discord) {
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Insefficiant Permissions")
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!member) return message.channel.send("No User Provided or Found");
        member.kick()
        message.channel.send(`user **${member.user.tag}** has been kicked`)

    }
}