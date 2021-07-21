// Importing dependencies
const fetch = require("node-fetch");

module.exports = {
    name: "dog",
    aliases: ["doggy"],
    description: "pull up a random dog photo",

    async execute(message, args, cmd, client, Discord) {
        // fetching the api
        fetch("https://random.dog/woof.json").then(
            // converting recieved information to json format
            (response) => response.json()
        );
        const { url } = await fetch("https://random.dog/woof.json").then(
            (response) => response.json()
        );

        // sending image to channel
        message.channel.send(url);
        // logging json for debugging
        console.log("command");
    },
};
