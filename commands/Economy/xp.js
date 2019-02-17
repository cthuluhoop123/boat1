const Discord = require("discord.js");
const emotes = require("../../utils/emotes.json");

module.exports.run = async (bot, message, args) => {
    let target = message.mentions.users.first() || message.author;
    /* if(!bot.users.find(x=> x.id == target) || !bot.users.find(x=> x.username == target) || !bot.users.find(x=> x.tag == target) || !bot.users.find(x=> x.member.displayName == target)){
        message.channel.send(`${emotes.Error} **Please input a valid user.**`)
    }*/

    const admin = require('firebase-admin');
    var db = admin.firestore();

    var GetRef = db.collection("xp").doc(message.guild.id + "-" + target.id);

    GetRef.get().then(function (doc) {
        if (doc.exists) {
            let xp = doc.data().xp;
            let level = doc.data().level;
            let reallevel;
            if (level == 0) {
                reallevel = "0"
            } else if (level == 1) {
                reallevel = "1"
            } else if (level == 2) {
                reallevel = "2"
            } else if (level == 3) {
                reallevel = "3"
            } else if (level == 4) {
                reallevel = "4"
            } else {
                reallevel = "9999999"
            }

            let XPEm = new Discord.RichEmbed()
                .setTitle("XP State:")
                .setAuthor(target.tag, target.displayAvatarURL)
                .setThumbnail(message.guild.iconURL)
                .setColor('RANDOM')
                .addField("XP", xp, true)
                .addField("Level", reallevel, true)

            message.channel.send(XPEm);
        } else {
            message.channel.send(`**${emotes.Error} I do not have a database entry for ${target.tag}.**`)
                .catch(function (error) {
                    console.error("Error adding guild to database: ", error);
                });
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}

module.exports.command = {
    name: "xp",
    aliases: ["level"],
    usable: "Users",
    description: "Check your or someone else's XP.",
    usage: "xp || xp <@USER/ID>",
    category: "xp",
    enabled: true
};