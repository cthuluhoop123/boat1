const ids = require("../../utils/ids.json");
const emotes = require("../../utils/emotes.json");

module.exports.run = async (bot, message, args) => {
    if(message.author.id != ids.Joe) return message.channel.send(`${emotes.Error} **You don't have permissions to use this command.**`);
    
    let sayMsg = args.join(" ");
    await message.delete()
    message.channel.send(sayMsg);

}

module.exports.command = {
    name: "say",
    aliases: [],
    usable: "Management",
    description: "Say something as if you were the bot.",
    usage: "say <something>",
    category: "Misc",
    enabled: true
};
