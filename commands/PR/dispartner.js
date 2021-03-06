const ids = require("../../utils/ids.json");
const emotes = require("../../utils/emotes.json");
const admin = require('firebase-admin');
var db = admin.firestore();

module.exports.run = async (bot, message, args) => {
    if (message.author.id != ids.Joe) return;
    let serverID = args[0];
    if (!serverID) return message.channel.send(`${emotes.Error} **Please input a valid Server ID.**`);
    var GetRef = await db.collection("guilds").doc(message.guild.id);
    if (!bot.guilds.find(x => x.id == serverID)) {
        message.channel.send(`${emotes.Error} **Please input a valid Server ID.**`);
        return;
    }
    GetRef.get().then(function async (doc) {
        if (!doc.exists) {
            message.channel.send(`**${emotes.Error} I do not have any database for that guild.**`)
            return;
        } else if (doc.data().partner == false) {
            message.channel.send(`${emotes.Error} **${bot.guilds.get(serverID).name} is not an official partner.**`);
            return;
        } else {
            db.collection("guilds").doc(message.guild.id).update({
                    Partner: false,
                })
                .then(() => {
                    message.channel.send(`${emotes.Success} **\`${bot.guilds.get(serverID).name}\` is now an official partner.**`);
                })
                .catch(function (error) {
                    console.error("Error adding guild to database: ", error);
                });
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });

};

module.exports.command = {
    name: "dispartner",
    aliases: [],
    usable: "PR",
    description: "Removes a guild from Stan's Official partnership.",
    usage: "dispartner <SERVERID>",
    category: "Owner",
    enabled: true
};  