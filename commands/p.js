const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");

const info = `:x: Not added yet.`;
const usage = `:x: Not added yet`

exports.run = async (bot, message, args) => {
    const voiceChannel = message.member.voice.channel;

	if (!voiceChannel)
		return message.channel.send(
			"You need to be in a channel to execute this command!"
		);
	const permissions = voiceChannel.permissionsFor(message.client.user);
	if (!permissions.has("CONNECT"))
		return message.channel.send("You dont have the correct permissions");
	if (!permissions.has("SPEAK"))
		return message.channel.send("You dont have the correct permissions");
	if (!args.length)
		return message.channel.send("You need to send the second argument!");

	const validURL = (str) => {
		var regex =
			/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
		if (!regex.test(str)) {
			return false;
		} else {
			return true;
		}
	};

	if (validURL(args[0])) {
		const connection = await voiceChannel.join();
		const stream = ytdl(args[0], { filter: "audioonly" });

		connection.play(stream, { seek: 0, volume: 1 }).on("finish", () => {
			message.channel.send("The Song Has Ended, Please Input Another");
		});

		await message.reply(`:thumbsup: Now Playing ***Your Link!***`);

		return;
	}

	const connection = await voiceChannel.join();

	const videoFinder = async (query) => {
		const videoResult = await ytSearch(query);

		return videoResult.videos.length > 1 ? videoResult.videos[0] : null;
	};

	const video = await videoFinder(args.join(" "));

	if (video) {
		const stream = ytdl(video.url, { filter: "audioonly" });
		connection.play(stream, { seek: 0, volume: 1 }).on("finish", () => {
			voiceChannel.leave();
		});

		await message.reply(`:thumbsup: Now Playing ***${video.title}***`);
	} else {
		message.channel.send("No video results found");
	}
}
exports.help = {
    name: "p",
};
