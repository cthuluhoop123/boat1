const Discord = require("discord.js");
const {
    get
} = require("superagent");

module.exports.run = async (bot, message, args) => {
    let target;
    if (!args[0]) {
        target = `<@${message.author.id}>`
    } else {
        target = args.join(" ")
    }

    await get('https://nekos.life/api/v2/img/pat').then(res => {
        let embed = new Discord.RichEmbed()
            .setImage(res.body.url)
            .setColor("0xFFB6C1")
            .setAuthor("Pat pat..", "https://stickershop.line-scdn.net/stickershop/v1/product/1408555/LINEStorePC/main.png")
            .setDescription(`**<@${message.author.id}>** Pats ${target}`)

        message.channel.send(embed)
    });

}

module.exports.command = {
    name: 'pat',
    aliases: [],
    usable: "Users",
    description: "Pat someone.",
    usage: "+pat <@USER/ID>",
    category: "Image",
    enabled: true
};