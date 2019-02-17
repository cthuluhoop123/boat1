const Discord = require("discord.js");
const { get } = require("superagent");
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var date = new Date();

module.exports.run = async (bot, message, args) => {

    await get('https://api-to.get-a.life/pandaimg').then(res => {
        let embed = new Discord.RichEmbed()
            .setImage(res.body.link)
            .setColor("0xFFB6C1")
            .setAuthor("WOAH! panda on the way", "http://icons.iconarchive.com/icons/google/noto-emoji-animals-nature/1024/22261-panda-face-icon.png")
            .setFooter(`Requested bt: ${message.author.tag} || ${date.toLocaleDateString('eng-GB', options)}`, message.author.displayAvatarURL)

        message.channel.send(embed)
    });

}

module.exports.command = {
    name: 'panda',
    aliases: [],
    usable: "Users",
    description: "Send a picture of a panda.",
    usage: "+panda",
    category: "Image",
    enabled: true
};