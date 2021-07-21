module.exports = {
    name: 'ban',
    aliases: ['execute'],
    description: 'ban users',
    async execute(message, args, cmd, client, Discord) {
        // checks for proper permissions
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Insefficiant Permissions")
        // recieves info from input about the user being banned
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        // checks for a valid member
        if (!member) return message.channel.send('```!!ban <member> <reason> <days>```');
        let reason = args.slice(1).join(' ');
        // no reason is provided state that no reason is provided
        if (!reason) {
            reason = "No Reason Provided"
        }
        // bans user and deletes messages in the past 7 days
        member.ban({
            reason: reason,
            days: 7
        })
        // sends info about the user being banned
        message.channel.send(`user **${member.user.tag}** has been banned for **${reason}** and messages from this user in the past 7 days have been deleted`)
    }
}