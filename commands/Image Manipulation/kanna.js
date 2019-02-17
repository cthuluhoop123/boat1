const Discord = require("discord.js");
const {
    get
} = require("superagent");
module.exports.run = async (bot, message, args) => {
    try {
        if (!args[0]) {
            message.channel.send('⛔ **Incorrect format.**\n`>kanna TEXT`')
            return;
        }
        let url = `https://nekobot.xyz/api/imagegen?type=kannagen&text=${args.join(" ")}`
        await get(url).then(res => {
            let embed = new Discord.RichEmbed()
                .setColor("0xFFB6C1")
                .setAuthor("Kanna says..", "https://i.imgur.com/BEKTnEe.png")
                .setImage(res.body.message)

            message.channel.send(embed);

        });
    } catch (err) {
        console.log(err)
    }
}
module.exports.command = {
    name: 'kanna',
    aliases: ["kannasays"],
    usable: "Users",
    description: "Sends a picture of Kanna holding a sign with the user's input on it.",
    usage: "+kanna <TEXT>",
    category: "Image Manipulation",
    enabled: true
};