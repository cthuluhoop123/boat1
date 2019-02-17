const Discord = require("discord.js");

module.exports.run = async (bot,message,args) => {
    let embed = new Discord.RichEmbed()
    .setAuthor(`TEMP HELP EMBED`, message.author.displayAvatarURL)
    .setThumbnail(bot.user.displayAvatarURL)
    .setDescription(`**THIS IS A TEMPORARY EMBED SHHH**\n\n${bot.commands.filter(x=> x.command.category != "Owner").map(x=> `◆》 **${x.command.name}** - ${x.command.description}`).join("\n")}`)

    message.channel.send(embed)
}

module.exports.command = {
name: "help",
aliases: ["halp"],
usable: "Users",
description: "Sends a temp help embed.",
usage: "help",
category: "Misc",
enabled: true
};