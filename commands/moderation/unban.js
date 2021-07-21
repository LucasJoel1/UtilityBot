module.exports = {
    name: 'unban',
    description: 'unbanned previously banned users',
    aliases: ['forgive', 'pardon'],
    async execute(message, args, cmd, client, Discord) {
        // checks for proper permissions from user
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Insefficiant Permissions")
        const member = args[0];
        // checks if a valid user was inputed
        if (!member) return message.channel.send("NO MEMBER PROVIDED");
        // unbans user
        message.guild.fetchBans().then(bans => {
            message.guild.members.unban(member)
        })
        // sends if when user was unbanned
        await message.channel.send(`${member} has been unbanned from ${message.guild}`);
    }
}