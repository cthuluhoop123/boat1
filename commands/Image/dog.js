const Discord = require("discord.js");
const { get } = require("superagent");
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var date = new Date();

module.exports.run = async (bot, message, args) => {

    await get('https://nekos.life/api/v2/img/woof').then(res => {
        let embed = new Discord.RichEmbed()
            .setImage(res.body.url)
            .setColor("0xFFB6C1")
            .setAuthor("Woof! doggo on the way", "https://i.imgur.com/zinUUxn.png")
            .setFooter(`Requested bt: ${message.author.tag} || ${date.toLocaleDateString('eng-GB', options)}`, message.author.displayAvatarURL)

        message.channel.send(embed)
    });

}

module.exports.command = {
    name: 'dog',
    aliases: ["woof"],
    usable: "Users",
    description: "Send a picture of a dog.",
    usage: "+dog",
    category: "Image",
    enabled: true
};