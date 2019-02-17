const emotes = require("../../utils/emotes.json");

module.exports.run = async (bot, message, args) => {
    const admin = require('firebase-admin');
    var db = admin.firestore();

    var GetRef = db.collection("economy").doc(message.guild.id + "-" + message.author.id);

    GetRef.get().then(function (doc) {
        if (doc.exists) {
            let money = doc.data().money;
            let cash = doc.data().cash;
            let bank = doc.data().bank;

            if(args[0] == "withdraw"){
                if(!args[1]) return message.channel.send(`${emotes.Error} **Please input the value you want to withdraw.**`);
                if(isNaN(args[1])) return message.channel.send(`${emotes.Error} **Please input a valid value to withdraw.**`);
                if(args[1] > bank) return message.channel.send(`${emotes.Error} **You do not have that amount in your bank to withdraw.**`);
                let moneyTaken = parseInt(args[1]);
                let BankBal = bank - moneyTaken;
                let newCash = cash + moneyTaken;

                db.collection("economy").doc(message.guild.id + "-" + message.author.id).update({
                    cash: newCash,
                    bank: BankBal
                })
                .then(() => {
                    message.channel.send(`${emotes.Success} **Added \`${moneyTaken}\` to your cash. Your new bank balance is \`${BankBal}\`.**`)
                })
            } else if(args[0] == "deposit"){
                if(!args[1]) return message.channel.send(`${emotes.Error} **Please input the value you want to deposit.**`);
                if(isNaN(args[1])) return message.channel.send(`${emotes.Error} **Please input a valid value to deposit.**`);
                if(args[1] > cash) return message.channel.send(`${emotes.Error} **You do not have that amount in your cash to deposit.**`);
                let moneyTaken = parseInt(args[1]);
                let BankBal = bank + moneyTaken;
                let newCash = Math.floor(cash - moneyTaken);
                let newmon = newCash + BankBal;

                db.collection("economy").doc(message.guild.id + "-" + message.author.id).update({
                    cash: newCash,
                    bank: BankBal,
                    money: newmon
                })
                .then(() => {
                    message.channel.send(`${emotes.Success} **Removed \`${moneyTaken}\` from your cash. Your new bank balance is \`${BankBal}\`.**`)
                })
            } else {
                message.channel.send(`${emotes.Error} **Please specify whether you want to \`deposit\` or \`withdraw\` with the amount.**`)
                return;
            }

        } else {
            message.channel.send(`**${emotes.Error} I do not have a database entry for ${message.author.tag}.**`)
                .catch(function (error) {
                    console.error("Error adding guild to database: ", error);
                });
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}

module.exports.command = {
    name: "bank",
    aliases: [],
    usable: "Users",
    description: "Withdraw or Deposite to your bank account.",
    usage: "bank <withdraw/deposite> <amount>",
    category: "Economy",
    enabled: true
};