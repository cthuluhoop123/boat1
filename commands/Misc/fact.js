const Discord = require("discord.js");
const {
    get
} = require("snekfetch");
module.exports.run = async (bot, message, args) => {
    try {
        await get("https://nekos.life/api/v2/fact").then(res => {
            const embed = new Discord.RichEmbed()
                .setDescription(res.body.fact)
                .setColor("0xFFB6C1")
                .setAuthor(`Facts!`, "https://static.thenounproject.com/png/404176-200.png")

            message.channel.send(embed)

        });
    } catch (err) {
        console.log(err);
    }

}

module.exports.command = {
    name: 'fact',
    aliases: ["knowledge"],
    usable: "Users",
    description: "Sends out a random fact.",
    usage: "+fact",
    category: "Misc",
    enabled: true
};