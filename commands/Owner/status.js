const ids = require("../../utils/ids.json");

module.exports.run = async (bot, message, args) => {
    if (!message.author.id == ids.Joe || !message.author.id == ids.Kacey) return;
    const status = args.join(" ");
    if (!args[0]) return message.channel.send("You need to specify a status!");
    await bot.user.setActivity(status)
    message.channel.send(`Set the playing status to \`${status}\``)
}
module.exports.command = {
    name: 'status',
    aliases: [],
    usable: "Owner",
    description: "Set the bot's playing status.",
    usage: "+status <new status>",
    category: "Owner",
    enabled: true
};