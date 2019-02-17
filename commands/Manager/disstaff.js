const ids = require("../../utils/ids.json");
const emotes = require("../../utils/emotes.json");
const admin = require('firebase-admin');
var db = admin.firestore();

module.exports.run = async (bot, message, args) => {
    if (message.author.id != ids.Joe) return;
    let serverID = args[0];
    var GetRef = await db.collection("guilds").doc(serverID);
    if (!serverID) return message.channel.send(`${emotes.Error} **Please input a valid Server ID.**`);
    if (!bot.guilds.find(x => x.id == serverID)) {message.channel.send(`${emotes.Error} **Please input a valid Server ID.**`);
        return;
    }
    GetRef.get().then(function (doc) {
        if (!doc.exists) {
            message.channel.send(`**${emotes.Error} I do not have any database for that guild.**`)
            return;
        } else if (doc.data.staff == false) {
            message.channel.send(`${emotes.Error} **${bot.guilds.get(serverID).name} Is already not a staff guild.**`);
            return;
        } else {
            db.collection("guilds").doc(message.guild.id).update({
                    Staff: false,
                })
                .then(() => {
                    message.channel.send(`${emotes.Success} **Disabled Staff version for \`${bot.guilds.get(serverID).name}\`**`);
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
    name: "disstaff",
    aliases: ["distaff"],
    usable: "Owner",
    description: "Disables Stan Staff on a server.",
    usage: "disstaff <SERVERID>",
    category: "Owner",
    enabled: true
};