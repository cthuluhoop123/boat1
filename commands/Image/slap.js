const Discord = require("discord.js");
const { get } = require("superagent");

module.exports.run = async (bot, message, args) => {
    let target;
    if (!args[0]) {
        target = `<@${message.author.id}>`
    } else {
        target = args.join(" ")
    }
    await get('https://nekos.life/api/v2/img/slap').then(res => {
        let embed = new Discord.RichEmbed()
            .setImage(res.body.url)
            .setColor("0xFFB6C1")
            .setAuthor("OUCH", "https://cdn2.iconfinder.com/data/icons/harassment-1/1000/Harassment-11-512.png")
            .setDescription(`**<@${message.author.id}>** Slaps ${target}`)

        message.channel.send(embed)
    });

}

module.exports.command = {
    name: 'slap',
    aliases: [],
    usable: "Users",
    description: "Slap someone.",
    usage: "+slap <@USER/ID>",
    category: "Image",
    enabled: true
};