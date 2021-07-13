exports.run = async (bot,message,args) => {

    if(!message.member.voice.channel) 
    return message.channel.send("Please connect to a voice channel"); //If you are not in the voice channel, then return a message
    message.member.voice.channel.join();

}

exports.help = {
    name: 'joinVC'
}