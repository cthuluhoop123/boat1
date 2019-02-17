const ids = require("../../utils/ids.json");
const emotes = require("../../utils/emotes.json");
const admin = require('firebase-admin');
var db = admin.firestore();
const functions = require("../../Functions/FunctionHandler.js");

module.exports.run = async (bot, message, args) => {
  if (message.author.id != ids.Joe) return;
  let serverID = args[0];
  if (!serverID) return message.channel.send(`${emotes.Error} **Please input a valid Server ID.**`);
  var GetRef = await db.collection("guilds").doc(serverID);
  if (!bot.guilds.find(x => x.id == serverID)) {
    bot.users.get(ids.Joe).send(`${message.author.tag} tried enabling premium for a server I am not in (${serverID}) in <#${message.channel.id}>`);
    message.channel.send(`${emotes.Error} **Please input a valid Server ID.**`);
    return;
  }
  GetRef.get().then(function (doc) {
    if (!doc.exists) {
      message.channel.send(`**${emotes.Error} I do not have any database for that guild.**`)
      return;
    } else if (doc.data().premium == true) {
      message.channel.send(`${emotes.Error} **${bot.guilds.get(serverID).name} already has premium.**`);
      return;
    } else {
      db.collection("guilds").doc(message.guild.id).update({
          Premium: true,
        })
        .then(() => {
          message.channel.send(`${emotes.Success} **Enabled Premium for \`${bot.guilds.get(serverID).name}\`**`);
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
  name: "enprem",
  aliases: ["enpremium"],
  usable: "Owner",
  description: "Enables Stan Premium on a server.",
  usage: "enprem <SERVERID>",
  category: "Owner",
  enabled: true
};