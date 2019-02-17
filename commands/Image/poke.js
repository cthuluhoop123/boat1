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
        await get("https://nekos.life/api/v2/img/poke").then(res => {
            let embed = new Discord.RichEmbed()
                .setImage(res.body.url)
                .setColor("0xFFB6C1")
                .setAuthor(`Pokes!`, "https://images.tech.co/wp-content/uploads/2018/11/13100838/poke-icon.png")
                .setDescription(`**<@${message.author.id}>** Poked ${target}`)

                message.channel.send(embed);
        });
    } catch (err) {
        console.log(err);
    }
}
module.exports.command = {
    name: 'poke',
    aliases: ["pokes"],
    usable: "Users",
    description: "poke someone.",
    usage: "+poke <@USER/ID>",
    category: "Image",
    enabled: true
};