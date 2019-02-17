const Discord = require("discord.js");
const {
    get
} = require("snekfetch");
module.exports.run = async (bot, message, args) => {
    try {
        let target;
        if (!args[0]) {
            target = `<@${message.author.id}>`
        } else {
            target = args.join(" ")
        }
        await get("https://nekos.life/api/hug").then(res => {
            let embed = new Discord.RichEmbed()
                .setImage(res.body.url)
                .setColor("0xFFB6C1")
                .setAuthor(`Hugs!`, "https://cdn.discordapp.com/emojis/507643252325875712.png")
                .setDescription(`**<@${message.author.id}>** Sent cute hugs to ${target}`)

                message.channel.send(embed);
        });
    } catch (err) {
        console.log(err);
    }
}
module.exports.command = {
    name: 'hug',
    aliases: ["hugs"],
    usable: "Users",
    description: "Hug someone.",
    usage: "+hug <@USER/ID>",
    category: "Image",
    enabled: true
};