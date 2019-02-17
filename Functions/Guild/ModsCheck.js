const admin = require('firebase-admin');
var db = admin.firestore();
const functions = require("../FunctionHandler.js");
const GuildModsCheck = async (message) => {
    var GetRef = db.collection("guilds").doc(message.guild.id);
    let doc = await GetRef.get()
    if (doc.exists) {
        const GuildModsState = doc.data().Mods;
        if (GuildModsState == []) return false;
        if (GuildModsState == true) return doc.data().Mods;
    } else {
        functions.AddGuild(message)
    }
}
module.exports = GuildModsCheck;