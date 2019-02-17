const emotes = require("../../utils/emotes.json");

module.exports.run = async (bot, message, args) => {
    const admin = require('firebase-admin');
    var db = admin.firestore();
    let target = message.mentions.users.first();
    var GivenRef = db.collection("economy").doc(message.guild.id + "-" + target.id);

    if(args[0] == "add" || args[0] == "+"){
        GivenRef.get().then(function (doc) {
            if (doc.exists) {
                if (!args[2]) return message.channel.send(`${emotes.Error} **Please input a value.**`);
                if (isNaN(args[2])) return message.channel.send(`${emotes.Error} **Please input a valid value.**`);
                let moneyTaken = parseInt(args[2]);
                
                let cash = doc.data().cash;
                let bank = doc.data().bank;
                let monTaken = parseInt(args[2]);
                let NewMon = bank + cash + monTaken
                let newBan = bank + monTaken;
                db.collection("economy").doc(message.guild.id + "-" + target.id).update({
                    money: NewMon,
                    bank: newBan
                })
                .then(() => {
                    message.channel.send(`${emotes.Success} **I have added \`${moneyTaken}\` to \`${target.tag}\`'s balance.**`);
                })
            } else {
                message.channel.send(`**${emotes.Error} I do not have a database entry for ${target.tag}.**`)
                    .catch(function (error) {
                        console.error("Error adding guild to database: ", error);
                    });
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    } else if(args[0] == "remove" || args[0] == "-"){
        GivenRef.get().then(function (doc) {
            if (doc.exists) {
                if (!args[2]) return message.channel.send(`${emotes.Error} **Please input a value.**`);
                if (isNaN(args[2])) return message.channel.send(`${emotes.Error} **Please input a valid value.**`);
                let moneyTaken = parseInt(args[2]);
                let cash = doc.data().cash;
                let bank = doc.data().bank;
                let monTaken = parseInt(args[2]);
                let NewMon = bank + cash - monTaken
                let newBan = bank - monTaken;

                let toomuchbank;
                if(monTaken > cash){
                    toomuchbank = 0;
                } else {
                    toomuchbank = cash - monTaken;
                }
                if(moneyTaken > bank){
                    db.collection("economy").doc(message.guild.id + "-" + target.id).update({
                        money: toomuchbank,
                        bank: 0
                    })
                    .then(() => {
                        message.channel.send(`${emotes.Success} **I have taken \`${bank}\` from \`${target.tag}\`'s balance. (That's all they had)**`);
                        return;
                    })
                }
                db.collection("economy").doc(message.guild.id + "-" + target.id).update({
                    money: NewMon,
                    bank: newBan
                })
                .then(() => {
                    message.channel.send(`${emotes.Success} **I have taken \`${moneyTaken}\` from \`${target.tag}\`'s balance.**`);
                })
            } else {
                message.channel.send(`**${emotes.Error} I do not have a database entry for ${target.tag}.**`)
                    .catch(function (error) {
                        console.error("Error adding guild to database: ", error);
                    });
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    } else if(args[0] == "wipe" || args[0] == "0"){
        GivenRef.get().then(function (doc) {
            if (doc.exists) {
                db.collection("economy").doc(message.guild.id + "-" + target.id).update({
                    money: 0,
                    bank: 0,
                    cash: 0
                })
                .then(() => {
                    message.channel.send(`${emotes.Success} **I have wiped \`${target.tag}\`'s balance.**`);
                })
            } else {
                message.channel.send(`**${emotes.Error} I do not have a database entry for ${target.tag}.**`)
                    .catch(function (error) {
                        console.error("Error adding guild to database: ", error);
                    });
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    } else if(args[0] == "addcash" || args[0] == "+cash"){
        GivenRef.get().then(function (doc) {
            if (doc.exists) {
                if (!args[2]) return message.channel.send(`${emotes.Error} **Please input a value.**`);
                if (isNaN(args[2])) return message.channel.send(`${emotes.Error} **Please input a valid value.**`);
                let moneyTaken = parseInt(args[2]);
                
                let cash = doc.data().cash;
                let bank = doc.data().bank;
                let monTaken = parseInt(args[2]);
                let NewMon = bank + cash + monTaken
                let newCash = cash + monTaken;
                db.collection("economy").doc(message.guild.id + "-" + target.id).update({
                    money: NewMon,
                    cash: newCash
                })
                .then(() => {
                    message.channel.send(`${emotes.Success} **I have added \`${moneyTaken}\` to \`${target.tag}\`'s balance.**`);
                })
            } else {
                message.channel.send(`**${emotes.Error} I do not have a database entry for ${target.tag}.**`)
                    .catch(function (error) {
                        console.error("Error adding guild to database: ", error);
                    });
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    } else if(args[0] == "removecash" || args[0] == "-cash"){
        GivenRef.get().then(function (doc) {
            if (doc.exists) {
                if (!args[2]) return message.channel.send(`${emotes.Error} **Please input a value.**`);
                if (isNaN(args[2])) return message.channel.send(`${emotes.Error} **Please input a valid value.**`);
                let moneyTaken = parseInt(args[2]);
                
                let cash = doc.data().cash;
                let bank = doc.data().bank;
                let monTaken = parseInt(args[2]);
                let NewMon = bank + cash - monTaken
                let newcash = cash - monTaken;

                let toomuchbank;
                if(monTaken > cash){
                    toomuchbank = 0;
                } else {
                    toomuchbank = cash - monTaken;
                }
                if(moneyTaken > bank){
                    db.collection("economy").doc(message.guild.id + "-" + target.id).update({
                        money: toomuchbank,
                        bank: 0
                    })
                    .then(() => {
                        message.channel.send(`${emotes.Success} **I have taken \`${bank}\` from \`${target.tag}\`'s balance. (That's all they had)**`);
                        return;
                    })
                }
                db.collection("economy").doc(message.guild.id + "-" + target.id).update({
                    money: NewMon,
                    cash: newcash
                })
                .then(() => {
                    message.channel.send(`${emotes.Success} **I have taken \`${moneyTaken}\` from \`${target.tag}\`'s balance.**`);
                })
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

}

module.exports.command = {
    name: "economy",
    aliases: ["eco"],
    usable: "Owner",
    description: "Add/Remove/Wipe someone's bal.",
    usage: "ree",
    category: "Economy",
    enabled: true
};