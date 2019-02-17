const ids = require("../../utils/ids.json");

module.exports.run = async (bot, message, args) => {
    if (!message.author.id == ids.Joe || !message.author.id == ids.Kacey) return;
    await message.channel.send("Restarting bot...");
    await process.exit()
}
module.exports.command = {
    name: 'restart',
    aliases: ["rs"],
    usable: "Owner",
    description: "Restarts the bot.",
    usage: "+restart",
    category: "Owner",
    enabled: true
};