const Discord = require("discord.js")
const admin = require('firebase-admin');
let db = admin.firestore();


module.exports.run = async (bot, message, args) => {
    db.collection("xp").where("ServerID", "==", message.guild.id).orderBy("level", "desc").limit(10).get().then((docs) => {
        let count = 0;
        let embed = new Discord.RichEmbed()
            .setAuthor(`${message.guild.name} XP Leaderboard`, message.guild.iconURL)
            .setColor('RANDOM')
            .setDescription("**Top ten active users:** \n\n" + docs.docs.map(x => `\`${count +=1})\` **<@${x.data().UserID}> - ${x.data().xp}XP (Level ${x.data().level})**`).join("\n"))

            .setThumbnail(bot.user.displayAvatarURL)
        return message.channel.send(embed)
    })
}
module.exports.command = {
    name: "leaderboard",
    aliases: ["top", "xpleaderboard"],
    usable: "Users",
    description: "Check the xp leaderboard.",
    usage: "top",
    category: "Economy",
    enabled: true
};
