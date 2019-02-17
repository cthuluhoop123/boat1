const ids = require("../../utils/ids.json");
const emotes = require("../../utils/emotes.json");
const Discord = require("discord.js");
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var date = new Date();

module.exports.run = async (bot, message, args) => {
    if (message.author.id != ids.Joe) return

    await message.delete()
    let embed = new Discord.RichEmbed()
    .setAuthor("New Todo Item!", message.guild.iconURL)
    .setColor('RANDOM')
    .setDescription(`\`••\`${args.join(" ")}\n\n-------------------------------------`)
    .setFooter(`By: ${message.author.tag} || ${date.toLocaleDateString('eng-GB', options)}`, message.author.displayAvatarURL)
    bot.channels.get("538057826736799746").send(embed);
    message.channel.send(`${emotes.Success} **Successfully added item to the to-do list!**`).then((msg) => {
        msg.delete(10000);
    });

}
module.exports.command = {
    name: 'todo',
    aliases: [],
    usable: "Owner",
    description: "Adds something to the todo list...",
    usage: "stan todo <smth>",
    category: "Owner",
    enabled: true
};