const Discord = require("discord.js");
const {
    get
} = require("superagent");
module.exports.run = async (bot, message, args) => {
    try {
        if (!args[0]) {
            message.channel.send('⛔ **Incorrect format.**\n`>clyde TEXT`')
            return;
        }
        let url = `https://nekobot.xyz/api/imagegen?type=clyde&text=${args.join(" ")}`
        await get(url).then(res => {
            let embed = new Discord.RichEmbed()
                .setColor("0xFFB6C1")
                .setAuthor("Clyde says..", "https://cdn.discordapp.com/emojis/354676941565067265.png")
                .setImage(res.body.message)

                message.channel.send(embed);
        });
    } catch (err) {
        console.log(err)
    }
}
module.exports.command = {
    name: 'clyde',
    aliases: ["beepboop"],
    usable: "Users",
    description: "Sends a pictures of the user's input as a clyde message.",
    usage: "+clyde <TEXT>",
    category: "Image Manipulation",
    enabled: true
};