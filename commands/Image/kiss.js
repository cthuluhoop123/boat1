const Discord = require("discord.js");
const { get } = require("snekfetch");
module.exports.run = async (bot, message, args) => {
    try {
        let target;
        if (!args[0]) {
            target = `<@${message.author.id}>`
        } else {
            target = args.join(" ")
        }
        await get("https://nekos.life/api/kiss").then(res => {
            let embed = new Discord.RichEmbed()
                .setImage(res.body.url)
                .setColor("0xFFB6C1")
                .setAuthor(`Kisses!`, "https://cdn.discordapp.com/emojis/476946111026823170.png")
                .setDescription(`**<@${message.author.id}>** Sent cute kisses to ${target}`)

                message.channel.send(embed)
        });
    } catch (err) {
        console.log(err);
    }
}
module.exports.command = {
    name: 'kiss',
    aliases: ["kisses"],
    usable: "Users",
    description: "Kiss someone.",
    usage: "+kiss <@USER/ID>",
    category: "Image",
    enabled: true
};