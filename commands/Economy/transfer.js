const emotes = require("../../utils/emotes.json");

module.exports.run = async (bot, message, args) => {
    const admin = require('firebase-admin');
    var db = admin.firestore();
    let target = message.mentions.users.first();
    var GiverRef = db.collection("economy").doc(message.guild.id + "-" + message.author.id);
    var GivenRef = db.collection("economy").doc(message.guild.id + "-" + target.id);

    GiverRef.get().then(function (doc) {
        if (doc.exists) {
            let money = doc.data().money;
            let cash = doc.data().cash;
            let bank = doc.data().bank;
            if (!args[1]) return message.channel.send(`${emotes.Error} **Please input the value you want to transfer.**`);
            if (isNaN(args[1])) return message.channel.send(`${emotes.Error} **Please input a valid value to transfer.**`);
            let moneyTaken = parseInt(args[1]);
            if (moneyTaken > bank) return message.channel.send(`${emotes.Error} **You don't have that much money __in your bank__ to transfer.**`);
            let NowMon = (bank - moneyTaken) + cash;
            let nowBank = bank - moneyTaken;

            db.collection("economy").doc(message.guild.id + "-" + message.author.id).update({
                money: NowMon,
                bank: nowBank
            }).then(() => {
                message.channel.send(`${emotes.Success} **I have transferred \`${moneyTaken}\` from your bank account to theirs. Your new bank balance is \`${nowBank}\`.**`)
            })
        } else {
            message.channel.send(`**${emotes.Error} I do not have a database entry for ${message.author.tag}.**`)
                .catch(function (error) {
                    console.error("Error adding guild to database: ", error);
                });
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });


    GivenRef.get().then(function (doc) {
        if (doc.exists) {

            GiverRef.get().then(function (dec) {
                if (dec.exists) {
                    let benk = dec.data().bank;
                    if (!args[1]) return;
                    if (isNaN(args[1])) return;
                    let TakenMoney = parseInt(args[1]);
                    if (TakenMoney > benk) return;

                    let cash = doc.data().cash;
                    let bank = doc.data().bank;
                    let monTaken = parseInt(args[1]);
                    let NewMon = bank + cash + monTaken
                    let newBan = bank + monTaken;
                    db.collection("economy").doc(message.guild.id + "-" + target.id).update({
                        money: NewMon,
                        bank: newBan
                    })
                } else {
                    return;
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });

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
    name: "transfer",
    aliases: [],
    usable: "Users",
    description: "Transfer money to someone.",
    usage: "transfer <@USER/ID> <amount>",
    category: "Economy",
    enabled: true
};