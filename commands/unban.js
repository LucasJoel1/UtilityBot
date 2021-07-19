module.exports = {
    name: 'unban',
    description: 'unbanned previously banned users',
    aliases: ['forgive', 'pardon'],
    async execute(message, args, cmd, client, Discord) {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Insefficiant Permissions")
        const member = args[0];

        if (!member) return message.channel.send("NO MEMBER PROVIDED");
        message.guild.fetchBans().then(bans => {
            message.guild.members.unban(member)
        })

        await message.channel.send(`${member} has been unbanned from ${message.guild}`);
    }
}