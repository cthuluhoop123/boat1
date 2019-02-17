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
        await get("https://nekos.life/api/v2/img/tickle").then(res => {
            let embed = new Discord.RichEmbed()
                .setImage(res.body.url)
                .setColor("0xFFB6C1")
                .setAuthor(`Tickles!`, "https://i.imgur.com/Q5GAKI3.png")
                .setDescription(`**<@${message.author.id}>** Tickled ${target}`)

                message.channel.send(embed);
        });
    } catch (err) {
        console.log(err);
    }
}
module.exports.command = {
    name: 'tickle',
    aliases: ["tickles"],
    usable: "Users",
    description: "Tickle someone.",
    usage: "+tickle <@USER/ID>",
    category: "Image",
    enabled: true
};