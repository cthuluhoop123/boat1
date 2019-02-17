const Discord = require("discord.js");
const { get } = require("superagent");
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var date = new Date();

module.exports.run = async (bot, message, args) => {

    await get('https://api-to.get-a.life/redpandaimg').then(res => {
        let embed = new Discord.RichEmbed()
            .setImage(res.body.link)
            .setColor("0xFFB6C1")
            .setAuthor("WOAH! red panda on the way", "https://www.freepngimg.com/thumb/red_panda/4-2-red-panda-free-png-image-thumb.png")
            .setFooter(`Requested bt: ${message.author.tag} || ${date.toLocaleDateString('eng-GB', options)}`, message.author.displayAvatarURL)

        message.channel.send(embed)
    });

}

module.exports.command = {
    name: 'redpanda',
    aliases: [],
    usable: "Users",
    description: "Send a picture of a red panda.",
    usage: "+redpanda",
    category: "Image",
    enabled: true
};