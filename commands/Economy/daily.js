const emotes = require("../../utils/emotes.json");
const talkedRecently = new Set();

module.exports.run = async (bot, message, args) => {
    if (talkedRecently.has(message.author.id)) {
        message.channel.send(`${emotes.Error} **You have already claimed your dailies, please wait**`);
        return;
    }
    const admin = require('firebase-admin');
    var db = admin.firestore();
    let target = message.mentions.users.first() || message.author;
    var GivenRef = db.collection("economy").doc(message.guild.id + "-" + target.id);
    var GuildRef = db.collection("guilds").doc(message.guild.id);

    GivenRef.get().then(function (doc) {
        if (doc.exists) {
            GuildRef.get().then(function (doc) {
                if (doc.exists) {
                    if (doc.data().Partner == true) {
                        let min = 250;
                        let max = 500;
                        let income = parseInt(Math.floor(Math.random() * (max - min + 1)) + min)
                        let cash = parseInt(doc.data().cash);
                        let bank = parseInt(doc.data().bank);
                        let newCash = cash + income;
                        let NewMon = cash + bank + newCash;
                        db.collection("economy").doc(message.guild.id + "-" + target.id).update({
                            money: NewMon,
                            cash: newCash
                        }).then(() => {
                            if (target.id == message.author.id) {
                                message.channel.send(`${emotes.Money} **You have claimed your dailies in an Official partnered server for \`${income}\`.**`);
                            } else {
                                message.channel.send(`${emotes.Money} **You have given your dailies to \`${target.tag}\` in an Official partnered server for \`${income}\`.**`);
                            }
                        })
                    } else {
                        let min = 50;
                        let max = 300;
                        let income = parseInt(Math.floor(Math.random() * (max - min + 1)) + min)
                        let cash = doc.data().cash;
                        let bank = doc.data().bank;
                        let newCash = cash + income;
                        let NewMon = bank + newCash;
                        db.collection("economy").doc(message.guild.id + "-" + target.id).update({
                            money: NewMon,
                            cash: newCash
                        }).then(() => {
                            if (target.id == message.author.id) {
                                message.channel.send(`${emotes.Money} **You have claimed your dailies for \`${income}\`.**`);
                            } else {
                                message.channel.send(`${emotes.Money} **You have given your dailies to \`${target.tag}\` for \`${income}\`.**`);
                            }
                        })
                    }
                } else {
                    message.channel.send(`${emotes.Warning} **Please send one message in this server and then use the command again.**`);

                }
            });
        }
    })

    talkedRecently.add(message.author.id);
    setTimeout(() => {
        talkedRecently.delete(message.author.id);
    }, 43200000);


}

module.exports.command = {
    name: "daily",
    aliases: [],
    usable: "Users",
    description: "Claim your daily income.",
    usage: "daily || daily <@USER/ID>",
    category: "Economy",
    enabled: false
};