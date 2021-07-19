const { rapidAPI } = require('../config.json');
const Discord = require('discord.js');

module.exports ={
	name: 'short',
	description: 'shorten urls',
	async execute(client, message, args, Discord){

    const request = require('request');

    const options = {
		method: "POST",
		url: 'https://url-shortener-service.p.rapidapi.com/shorten',
		headers: {
			"content-type": 'application/x-www-form-urlencoded',
			"x-rapidapi-key": rapidAPI,
			"x-rapidapi-host": 'url-shortener-service.p.rapidapi.com',
			useQueryString: true,
		},
		form: { url: '' }
	};

	options.form.url = args[0];

	request(options, (err, res, body) => {
		let data = JSON.parse(body);

        console.log(data);
        console.log(args[0]);

		if (err || data.error) {
			return message.channel.send(`:x: Something went wrong.`);
		} 
        
        else {
			message.channel.send (new Discord.MessageEmbed()
                .setAuthor(message.author.tag)
                .setTitle("Utility Bot's URL Shortener")
                .setURL(data.result_url)
                .setDescription(`
**Your Shortened Link**
${data.result_url}

**Original Link**
${args[0]}
`)
.setFooter('Powered by Utility Bot Created by Lucas Joel')
.setColor ("#536DFE")
.setThumbnail ('https://i.ibb.co/Dpwjvy9/short.png')
            );
			console.log(body);
        }
    });
}
}