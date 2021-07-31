module.exports = {
    name: "avatar",
    aliases: [''],
    description: "gives the avatar of the user or a mentioned user",

    async execute(message, args, cmd, client, Discord) {
        const user = message.mentions.users.first() || message.author;
        return message.channel.send(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=1024`);
    }
}