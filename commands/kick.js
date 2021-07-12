exports.run = async (bot,message,args) => {
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Insefficiant Permissions")
    let member = message.mentions.members.first() || message.guild.members.cache.get (args[0])
    if (!member) return message.channel.send ("No User Provided or Found");
    member.kick()
    message.channel.send(`user **${member.user.tag}** has been kicked`)
    
}
exports.help = {
    name: 'kick'
}