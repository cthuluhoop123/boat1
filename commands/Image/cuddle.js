const Discord = require("discord.js");
const { get } = require("snekfetch");
const emotes = require("../../utils/emotes.json");

module.exports.run = async (bot, message, args) => {
    try {
        let target;
        if (!args[0]) {
            target = `<@${message.author.id}>`
        } else {
            target = args.join(" ")
        }
        await get("https://nekos.life/api/v2/img/cuddle").then(res => {
            let embed = new Discord.RichEmbed()
                .setImage(res.body.url)
                .setColor("0xFFB6C1")
                .setAuthor(`Cuddles!`, "https://cdn.discordapp.com/emojis/480861550266286082.png")
                .setDescription(`**<@${message.author.id}>** Cuddles ${target}`)
                message.channel.send(embed);
        });
    } catch (err) {
        console.log(err);
    }
}
module.exports.command = {
    name: 'cuddle',
    aliases: ["cuddles"],
    usable: "Users",
    description: "Cuddle someone.",
    usage: "+cuddle <@USER/ID>",
    category: "Image",
    enabled: true
};