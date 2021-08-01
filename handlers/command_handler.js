// Importing dependencies
const fs = require("fs");

module.exports = (client, Discord) => {
    // Allowing access to moderation files
    const moderation_files = fs
        .readdirSync("./commands/moderation/")
        .filter((file) => file.endsWith(".js"));

    for (const file of moderation_files) {
        const moderation = require(`../commands/moderation/${file}`);
        if (moderation.name) {
            client.commands.set(moderation.name, moderation);
        } else {
            continue;
        }
    }
    // Allowing access to api files
    const api_files = fs
        .readdirSync("./commands/api")
        .filter((file) => file.endsWith(".js"));

    for (const file of api_files) {
        const api = require(`../commands/api/${file}`);
        if (api.name) {
            client.commands.set(api.name, api);
        } else {
            continue;
        }
    }
    // Allowing access to utility files
    const utility_files = fs
        .readdirSync("./commands/utility")
        .filter((file) => file.endsWith(".js"));

    for (const file of utility_files) {
        const utility = require(`../commands/utility/${file}`);
        if (utility.name) {
            client.commands.set(utility.name, utility);
        } else {
            continue;
        }
        // Allows access to robotics files
    }
    const robotics_files = fs
        .readdirSync("./commands/robotics/")
        .filter((file) => file.endsWith(".js"));

    for (const file of robotics_files) {
        const robotics = require(`../commands/robotics/${file}`);
        if (robotics.name) {
            client.commands.set(robotics.name, robotics);
        } else {
            continue;
        }
    }
};