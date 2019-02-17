const Discord = require("discord.js");
const {
    get
} = require("superagent");
module.exports.run = async (bot, message, args) => {
    try {
        if (!args[0]) {
            message.channel.send('⛔ **Incorrect format.**\n`>trump TEXT`')
            return;
        }
        let url = `https://nekobot.xyz/api/imagegen?type=trumptweet&text=${args.join(" ")}`
        await get(url).then(res => {
            const embed = new Discord.RichEmbed()
                .setColor("0xFFB6C1")
                .setAuthor("Trump just tweeted", "https://clipart.info/images/ccovers/1495816049surprised-face-trump-png-transparent-clip-art.png")
                .setImage(res.body.message)

            message.channel.send(embed);

        });
    } catch (err) {
        console.log(err)
    }
}
module.exports.command = {
    name: 'trump',
    aliases: ["trumptweet"],
    usable: "Users",
    description: "Sends a picture of the user's input as a tweet from Trump.",
    usage: "+trump <TEXT>",
    category: "Image Manipulation",
    enabled: true
};