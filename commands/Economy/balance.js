const Discord = require("discord.js");
const emotes = require("../../utils/emotes.json");

module.exports.run = async (bot, message, args) => {
    let target = message.mentions.users.first() || message.author;
    /* if(!bot.users.find(x=> x.id == target) || !bot.users.find(x=> x.username == target) || !bot.users.find(x=> x.tag == target) || !bot.users.find(x=> x.member.displayName == target)){
        message.channel.send(`${emotes.Error} **Please input a valid user.**`)
    }*/

    const admin = require('firebase-admin');
    var db = admin.firestore();

    var GetRef = db.collection("economy").doc(message.guild.id + "-" + target.id);

    GetRef.get().then(function (doc) {
        if (doc.exists) {
            let money = doc.data().money;
            let cash = doc.data().cash;
            let bank = doc.data().bank;

            let wealth = doc.data().wealth;
            let realWealth;
            if (wealth == 0) {
                realWealth = "Poor"
            } else if (wealth == 1) {
                realWealth = "Poor"
            } else if (wealth == 2) {
                realWealth = "Gucci Gang"
            } else if (wealth == 3) {
                realWealth = "Gucci Gang"
            } else if (wealth == 4) {
                realWealth = "Bill gates owo?"
            } else if (wealth == 5) {
                realWealth = "Nani dafuq"
            } else {
                realWealth = "owo"
            }

            let MoneyEm = new Discord.RichEmbed()
                .setTitle("Money State:")
                .setAuthor(target.tag, target.displayAvatarURL)
                .setThumbnail(message.guild.iconURL)
                .setColor('RANDOM')
                .addField("Money", money, true)
                .addField("Cash", cash, true)
                .addField("Bank", bank, true)
                .addField("Wealth", realWealth, true)

            message.channel.send(MoneyEm);
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
    name: "balance",
    aliases: ["bal", "coins", "money", "cash"],
    usable: "Users",
    description: "Check your or someone else's money.",
    usage: "bal || bal <@USER/ID>",
    category: "Economy",
    enabled: true
};
