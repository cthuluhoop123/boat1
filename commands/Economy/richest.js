const Discord = require("discord.js")
const admin = require('firebase-admin');
let db = admin.firestore();


module.exports.run = async (bot, message, args) => {
    db.collection("economy").where("ServerID", "==", message.guild.id).orderBy("money", "desc").limit(10).get().then((docs) => {
        let count = 0;
        let embed = new Discord.RichEmbed()
            .setAuthor(`${message.guild.name} Richest Users!`, message.guild.iconURL)
            .setColor('RANDOM')
            .setDescription("**Top ten richest users:** \n\n" + docs.docs.map(x => `\`${count +=1})\` **<@${x.data().UserID}> - ${x.data().money}$ (Wealth: ${x.data().wealth})**`).join("\n"))

            .setThumbnail(bot.user.displayAvatarURL)
        return message.channel.send(embed)
    })
}
module.exports.command = {
    name: "richest",
    aliases: ["moneyleaderboard"],
    usable: "Users",
    description: "Check the money leaderboard.",
    usage: "richest",
    category: "Economy",
    enabled: true
};
