exports.run = async (bot,message,args) => {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Insefficiant Permissions")
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!member) return message.channel.send ('```!!ban <member> <reason> <days>```');
    let reason = args.slice(1).join(' ');
    if(!reason) {reason = "No Reason Provided"}
    member.ban({reason: reason, days: 7})
    message.channel.send(`user **${member.user.tag}** has been banned for **${reason}** and messages from this user in the past 7 days have been deleted`)
}
exports.help = {
    name: 'ban'
}