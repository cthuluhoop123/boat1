const Discord = require("discord.js");
const { get } = require("snekfetch");
var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};
var date = new Date();

module.exports.run = async (bot, message, args) => {

    await get("http://aws.random.cat/meow").then(res => {
        let embed = new Discord.RichEmbed()
            .setImage(res.body.file)
            .setColor("0xFFB6C1")
            .setAuthor("Meow! kitty on the way", "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/cat-alt-512.png")
            .setFooter(`Requested bt: ${message.author.tag} || ${date.toLocaleDateString('eng-GB', options)}`, message.author.displayAvatarURL)

        message.channel.send(embed)
    });

}

module.exports.command = {
    name: 'cat',
    aliases: ["meow"],
    usable: "Users",
    description: "Send a cat image.",
    usage: "+cat",
    category: "Image",
    enabled: true
};