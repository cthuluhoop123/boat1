module.exports.run = async (bot, message, args) => {
    let start = Date.now();
    let messagesent = await message.channel.send('Pong!');
    messagesent.edit(`🏓 Pong! \`${Date.now() - start}ms\``);
};

module.exports.command = {
    name: 'ping',
    aliases: ["mm", "pong"],
    usable: "Users",
    description: "Sends the bot's latency in milliseconds.",
    usage: "stan ping",
    category: "Misc",
    enabled: true
};