const Discord = require("discord.js");
const { get } = require("superagent");
module.exports.run = async (bot, message, args) => {
    try {
        if (!args[0]) {
            message.channel.send('⛔ **Incorrect format.**\n`>changemymind TEXT`')
            return;
        }
        let url = `https://nekobot.xyz/api/imagegen?type=changemymind&text=${args.join(" ")}`
        await get(url).then(res => {
            let embed = new Discord.RichEmbed()
                .setColor("0xFFB6C1")
                .setAuthor("Change my mind..", "http://icons.iconarchive.com/icons/google/noto-emoji-people-clothing-objects/1024/12130-brain-icon.png")
                .setImage(res.body.message)

                message.channel.send(embed);
        });
    } catch (err) {
        console.log(err);
    }
}
module.exports.command = {
    name: 'changemymind',
    aliases: ["cmm"],
    usable: "Users",
    description: "Sends a pictures of the user's input on a \"change my mind\" Sign.",
    usage: "+cmm <TEXT>",
    category: "Image Manipulation",
    enabled: true
};